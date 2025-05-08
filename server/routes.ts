import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { SortDirection, SortField } from "../client/src/lib/enums";
import { z } from "zod";
import { generateLeadId } from "../client/src/lib/utils";

export async function registerRoutes(app: Express): Promise<Server> {
  // API routes for leads
  app.get("/api/leads", async (req, res) => {
    try {
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 10;
      const search = req.query.search as string || "";
      const status = req.query.status as string || "";
      const source = req.query.source as string || "";
      const date = req.query.date as string || "";
      const owner = req.query.owner as string || "";
      const sortField = req.query.sortField as SortField || SortField.CREATED_DATE;
      const sortDirection = req.query.sortDirection as SortDirection || SortDirection.DESC;

      const { leads, total, totalPages } = await storage.getLeads(
        page,
        limit,
        search,
        { status, source, date, owner },
        sortField,
        sortDirection
      );

      res.json({ leads, total, totalPages });
    } catch (error) {
      console.error("Error fetching leads:", error);
      res.status(500).json({ message: "Failed to fetch leads" });
    }
  });

  app.get("/api/leads/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const lead = await storage.getLead(id);
      
      if (!lead) {
        return res.status(404).json({ message: "Lead not found" });
      }
      
      res.json(lead);
    } catch (error) {
      console.error("Error fetching lead:", error);
      res.status(500).json({ message: "Failed to fetch lead" });
    }
  });

  app.post("/api/leads", async (req, res) => {
    try {
      const leadData = req.body;
      leadData.leadId = generateLeadId();
      
      const lead = await storage.createLead(leadData);
      res.status(201).json(lead);
    } catch (error) {
      console.error("Error creating lead:", error);
      res.status(500).json({ message: "Failed to create lead" });
    }
  });

  app.put("/api/leads/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const leadData = req.body;
      
      const updatedLead = await storage.updateLead(id, leadData);
      
      if (!updatedLead) {
        return res.status(404).json({ message: "Lead not found" });
      }
      
      res.json(updatedLead);
    } catch (error) {
      console.error("Error updating lead:", error);
      res.status(500).json({ message: "Failed to update lead" });
    }
  });

  app.delete("/api/leads/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const success = await storage.deleteLead(id);
      
      if (!success) {
        return res.status(404).json({ message: "Lead not found" });
      }
      
      res.json({ message: "Lead deleted successfully" });
    } catch (error) {
      console.error("Error deleting lead:", error);
      res.status(500).json({ message: "Failed to delete lead" });
    }
  });

  // Bulk operations
  app.post("/api/leads/bulk-delete", async (req, res) => {
    try {
      const { ids } = req.body;
      
      if (!Array.isArray(ids) || ids.length === 0) {
        return res.status(400).json({ message: "Invalid request: ids array is required" });
      }
      
      const deletedCount = await storage.deleteLeads(ids);
      res.json({ message: `${deletedCount} leads deleted successfully` });
    } catch (error) {
      console.error("Error deleting leads:", error);
      res.status(500).json({ message: "Failed to delete leads" });
    }
  });

  app.post("/api/leads/bulk-update", async (req, res) => {
    try {
      const { ids, updates } = req.body;
      
      if (!Array.isArray(ids) || ids.length === 0 || !updates) {
        return res.status(400).json({ message: "Invalid request: ids array and updates object are required" });
      }
      
      const updatedCount = await storage.updateLeads(ids, updates);
      res.json({ message: `${updatedCount} leads updated successfully` });
    } catch (error) {
      console.error("Error updating leads:", error);
      res.status(500).json({ message: "Failed to update leads" });
    }
  });

  // Statistics
  app.get("/api/stats", async (req, res) => {
    try {
      const stats = await storage.getLeadStats();
      res.json(stats);
    } catch (error) {
      console.error("Error fetching stats:", error);
      res.status(500).json({ message: "Failed to fetch stats" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
