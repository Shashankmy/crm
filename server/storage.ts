import { InsertLead, Lead, User, InsertUser, leads, users } from "@shared/schema";
import { LeadStatus, LeadSource, SortDirection, SortField } from "../client/src/lib/enums";
import { generateLeadId } from "../client/src/lib/utils";
import { db } from "./db";
import { eq, and, like, or, asc, desc, sql } from "drizzle-orm";

// Interface for storage
export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Lead management
  getLead(id: number): Promise<Lead | undefined>;
  getLeads(
    page: number,
    limit: number,
    search: string,
    filters: { status: string; source: string; date: string; owner: string },
    sortField: SortField,
    sortDirection: SortDirection
  ): Promise<{ leads: Lead[]; total: number; totalPages: number }>;
  createLead(lead: InsertLead): Promise<Lead>;
  updateLead(id: number, lead: Partial<InsertLead>): Promise<Lead | undefined>;
  deleteLead(id: number): Promise<boolean>;
  deleteLeads(ids: number[]): Promise<number>;
  updateLeads(ids: number[], updates: Partial<InsertLead>): Promise<number>;
  getLeadStats(): Promise<{
    totalLeads: number;
    leadsByStatus: Record<LeadStatus, number>;
    leadsBySource: Record<LeadSource, number>;
    recentLeads: Lead[];
  }>;
}

export class DatabaseStorage implements IStorage {
  // User methods
  async getUser(id: number): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db.insert(users).values(insertUser).returning();
    return user;
  }

  // Lead methods
  async getLead(id: number): Promise<Lead | undefined> {
    const [lead] = await db.select().from(leads).where(eq(leads.id, id));
    return lead;
  }

  async getLeads(
    page: number,
    limit: number,
    search: string,
    filters: { status: string; source: string; date: string; owner: string },
    sortField: SortField,
    sortDirection: SortDirection
  ): Promise<{ leads: Lead[]; total: number; totalPages: number }> {
    // Build the where clause for filtering
    let whereConditions = [];
    
    // Apply search filter
    if (search) {
      whereConditions.push(
        or(
          like(leads.name, `%${search}%`),
          like(leads.email, `%${search}%`),
          like(leads.leadId, `%${search}%`)
        )
      );
    }
    
    // Apply status filter
    if (filters.status) {
      whereConditions.push(eq(leads.status, filters.status as LeadStatus));
    }
    
    // Apply source filter
    if (filters.source) {
      whereConditions.push(eq(leads.source, filters.source as LeadSource));
    }
    
    // Apply owner filter
    if (filters.owner) {
      if (filters.owner === "Me") {
        whereConditions.push(eq(leads.owner, "Shashank M Y"));
      } else if (filters.owner === "Unassigned") {
        whereConditions.push(sql`${leads.owner} IS NULL`);
      } else {
        whereConditions.push(eq(leads.team, filters.owner));
      }
    }
    
    // Apply date filter
    if (filters.date) {
      const now = new Date();
      const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
      const yesterday = new Date(today);
      yesterday.setDate(yesterday.getDate() - 1);
      
      const thisWeekStart = new Date(today);
      thisWeekStart.setDate(today.getDate() - today.getDay());
      
      const thisMonthStart = new Date(today.getFullYear(), today.getMonth(), 1);
      
      switch (filters.date) {
        case "Today":
          whereConditions.push(sql`${leads.createdAt} >= ${today.toISOString()}`);
          break;
        case "Yesterday":
          whereConditions.push(sql`${leads.createdAt} >= ${yesterday.toISOString()} AND ${leads.createdAt} < ${today.toISOString()}`);
          break;
        case "This week":
          whereConditions.push(sql`${leads.createdAt} >= ${thisWeekStart.toISOString()}`);
          break;
        case "This month":
          whereConditions.push(sql`${leads.createdAt} >= ${thisMonthStart.toISOString()}`);
          break;
      }
    }
    
    // Determine the total count
    const whereClause = whereConditions.length > 0 ? and(...whereConditions) : undefined;
    const [{ count }] = await db
      .select({ count: sql<number>`count(*)` })
      .from(leads)
      .where(whereClause);
    
    const total = Number(count);
    const totalPages = Math.ceil(total / limit);
    
    // Apply sorting
    let orderBy;
    switch (sortField) {
      case SortField.NAME:
        orderBy = sortDirection === SortDirection.ASC ? asc(leads.name) : desc(leads.name);
        break;
      case SortField.STATUS:
        orderBy = sortDirection === SortDirection.ASC ? asc(leads.status) : desc(leads.status);
        break;
      case SortField.SOURCE:
        orderBy = sortDirection === SortDirection.ASC ? asc(leads.source) : desc(leads.source);
        break;
      case SortField.OWNER:
        orderBy = sortDirection === SortDirection.ASC ? asc(leads.owner) : desc(leads.owner);
        break;
      case SortField.CREATED_DATE:
      default:
        orderBy = sortDirection === SortDirection.ASC ? asc(leads.createdAt) : desc(leads.createdAt);
        break;
    }
    
    // Fetch the leads with pagination
    const offset = (page - 1) * limit;
    const filteredLeads = await db
      .select()
      .from(leads)
      .where(whereClause)
      .orderBy(orderBy)
      .limit(limit)
      .offset(offset);
    
    return {
      leads: filteredLeads,
      total,
      totalPages
    };
  }

  async createLead(insertLead: InsertLead): Promise<Lead> {
    const leadId = generateLeadId();
    const now = new Date();
    
    // Convert string types to enum types if needed
    const processedLead: any = { ...insertLead };
    if (typeof insertLead.status === 'string') {
      processedLead.status = insertLead.status as LeadStatus;
    }
    if (typeof insertLead.source === 'string') {
      processedLead.source = insertLead.source as LeadSource;
    }
    
    const [lead] = await db
      .insert(leads)
      .values({
        ...processedLead,
        leadId,
        createdAt: now,
        updatedAt: now
      })
      .returning();
    
    return lead;
  }

  async updateLead(id: number, updates: Partial<InsertLead>): Promise<Lead | undefined> {
    const now = new Date();
    
    // Convert string types to enum types if needed
    const processedUpdates: any = { ...updates };
    if (typeof updates.status === 'string') {
      processedUpdates.status = updates.status as LeadStatus;
    }
    if (typeof updates.source === 'string') {
      processedUpdates.source = updates.source as LeadSource;
    }
    
    const [updatedLead] = await db
      .update(leads)
      .set({
        ...processedUpdates,
        updatedAt: now
      })
      .where(eq(leads.id, id))
      .returning();
    
    return updatedLead;
  }

  async deleteLead(id: number): Promise<boolean> {
    const result = await db
      .delete(leads)
      .where(eq(leads.id, id))
      .returning({ id: leads.id });
    
    return result.length > 0;
  }

  async deleteLeads(ids: number[]): Promise<number> {
    if (ids.length === 0) return 0;
    
    const result = await db
      .delete(leads)
      .where(sql`${leads.id} = ANY(ARRAY[${ids.join(',')}]::int[])`)
      .returning({ id: leads.id });
    
    return result.length;
  }

  async updateLeads(ids: number[], updates: Partial<InsertLead>): Promise<number> {
    if (ids.length === 0) return 0;
    
    const now = new Date();
    
    // Convert string types to enum types if needed
    const processedUpdates: any = { ...updates };
    if (typeof updates.status === 'string') {
      processedUpdates.status = updates.status as LeadStatus;
    }
    if (typeof updates.source === 'string') {
      processedUpdates.source = updates.source as LeadSource;
    }
    
    const result = await db
      .update(leads)
      .set({
        ...processedUpdates,
        updatedAt: now
      })
      .where(sql`${leads.id} = ANY(ARRAY[${ids.join(',')}]::int[])`)
      .returning({ id: leads.id });
    
    return result.length;
  }

  async getLeadStats(): Promise<{
    totalLeads: number;
    leadsByStatus: Record<LeadStatus, number>;
    leadsBySource: Record<LeadSource, number>;
    recentLeads: Lead[];
  }> {
    // Get total leads count
    const [{ count }] = await db
      .select({ count: sql<number>`count(*)` })
      .from(leads);
    
    const totalLeads = Number(count);
    
    // Count leads by status
    const statusCounts = await db
      .select({
        status: leads.status,
        count: sql<number>`count(*)`
      })
      .from(leads)
      .groupBy(leads.status);
    
    const leadsByStatus = statusCounts.reduce((acc, { status, count }) => {
      acc[status as LeadStatus] = Number(count);
      return acc;
    }, {} as Record<LeadStatus, number>);
    
    // Count leads by source
    const sourceCounts = await db
      .select({
        source: leads.source,
        count: sql<number>`count(*)`
      })
      .from(leads)
      .groupBy(leads.source);
    
    const leadsBySource = sourceCounts.reduce((acc, { source, count }) => {
      acc[source as LeadSource] = Number(count);
      return acc;
    }, {} as Record<LeadSource, number>);
    
    // Get 5 most recent leads
    const recentLeads = await db
      .select()
      .from(leads)
      .orderBy(desc(leads.createdAt))
      .limit(5);
    
    return {
      totalLeads,
      leadsByStatus,
      leadsBySource,
      recentLeads
    };
  }
}

// Add initial seed data for users and leads when app starts
async function seedInitialData() {
  try {
    // Check if users exist
    const userCount = await db.select({ count: sql<number>`count(*)` }).from(users);
    if (Number(userCount[0].count) === 0) {
      // Add sample users
      await db.insert(users).values([
        {
          username: "shashank.my",
          password: "password123",
          name: "Shashank M Y",
          role: "Sales Manager",
          team: "Sales Team 1"
        },
        {
          username: "priya.sharma",
          password: "password123",
          name: "Priya Sharma",
          role: "Sales Representative",
          team: "Sales Team 2"
        }
      ]);
    }

    // Check if leads exist
    const leadCount = await db.select({ count: sql<number>`count(*)` }).from(leads);
    if (Number(leadCount[0].count) === 0) {
      // Add sample leads
      const now = new Date();
      const date1 = new Date(now);
      date1.setDate(date1.getDate() - 1); // yesterday
      const date2 = new Date(now);
      date2.setDate(date2.getDate() - 2);
      const date3 = new Date(now);
      date3.setDate(date3.getDate() - 3);
      const date4 = new Date(now);
      date4.setDate(date4.getDate() - 4);

      await db.insert(leads).values([
        {
          leadId: "LD-2953",
          name: "Rahul Sharma",
          email: "rahul.sharma@example.com",
          phone: "+91 98765 43210",
          status: LeadStatus.QUALIFIED,
          source: LeadSource.WEBSITE,
          createdAt: now,
          updatedAt: now,
          owner: "Shashank M Y",
          team: "Sales Team 1",
          notes: "Interested in enterprise plan"
        },
        {
          leadId: "LD-2952",
          name: "Anjali Patel",
          email: "anjali.patel@example.com",
          phone: "+91 87654 32109",
          status: LeadStatus.IN_PROGRESS,
          source: LeadSource.REFERRAL,
          createdAt: date1,
          updatedAt: date1,
          owner: "Priya Sharma",
          team: "Sales Team 2",
          notes: "Follow up next week"
        },
        {
          leadId: "LD-2951",
          name: "Vikram Singh",
          email: "vikram.singh@example.com",
          phone: "+91 76543 21098",
          status: LeadStatus.NEW,
          source: LeadSource.SOCIAL_MEDIA,
          createdAt: date1,
          updatedAt: date1,
          owner: "Shashank M Y",
          team: "Sales Team 1",
          notes: "Initial contact made via LinkedIn"
        },
        {
          leadId: "LD-2950",
          name: "Neha Gupta",
          email: "neha.gupta@example.com",
          phone: "+91 65432 10987",
          status: LeadStatus.UNQUALIFIED,
          source: LeadSource.EMAIL_CAMPAIGN,
          createdAt: date2,
          updatedAt: date2,
          owner: "Priya Sharma",
          team: "Sales Team 2",
          notes: "Not interested at this time"
        },
        {
          leadId: "LD-2949",
          name: "Raj Malhotra",
          email: "raj.malhotra@example.com",
          phone: "+91 54321 09876",
          status: LeadStatus.IN_PROGRESS,
          source: LeadSource.WEBSITE,
          createdAt: date2,
          updatedAt: date2,
          owner: "Shashank M Y",
          team: "Sales Team 1",
          notes: "Requested product demo"
        },
        {
          leadId: "LD-2948",
          name: "Deepika Reddy",
          email: "deepika.reddy@example.com",
          phone: "+91 43210 98765",
          status: LeadStatus.QUALIFIED,
          source: LeadSource.REFERRAL,
          createdAt: date3,
          updatedAt: date3,
          owner: "Shashank M Y",
          team: "Sales Team 1",
          notes: "Very interested in premium features"
        },
        {
          leadId: "LD-2947",
          name: "Arjun Patel",
          email: "arjun.patel@example.com",
          phone: "+91 32109 87654",
          status: LeadStatus.NEW,
          source: LeadSource.WEBSITE,
          createdAt: date3,
          updatedAt: date3,
          owner: "Priya Sharma",
          team: "Sales Team 2",
          notes: "Signed up for a free trial"
        },
        {
          leadId: "LD-2946",
          name: "Kavita Singh",
          email: "kavita.singh@example.com",
          phone: "+91 21098 76543",
          status: LeadStatus.CONTACTED,
          source: LeadSource.EMAIL_CAMPAIGN,
          createdAt: date3,
          updatedAt: date3,
          owner: "Shashank M Y",
          team: "Sales Team 1",
          notes: "Initial email sent, awaiting response"
        },
        {
          leadId: "LD-2945",
          name: "Rajesh Kumar",
          email: "rajesh.kumar@example.com",
          phone: "+91 10987 65432",
          status: LeadStatus.UNQUALIFIED,
          source: LeadSource.SOCIAL_MEDIA,
          createdAt: date4,
          updatedAt: date4,
          owner: "Priya Sharma",
          team: "Sales Team 2",
          notes: "Budget constraints, not ready to purchase"
        },
        {
          leadId: "LD-2944",
          name: "Ananya Verma",
          email: "ananya.verma@example.com",
          phone: "+91 98765 43210",
          status: LeadStatus.IN_PROGRESS,
          source: LeadSource.WEBSITE,
          createdAt: date4,
          updatedAt: date4,
          owner: "Shashank M Y",
          team: "Sales Team 1",
          notes: "Scheduled demo for next week"
        }
      ]);
    }
  } catch (error) {
    console.error("Error seeding initial data:", error);
  }
}

// Initialize the database and seed data
seedInitialData();

export const storage = new DatabaseStorage();
