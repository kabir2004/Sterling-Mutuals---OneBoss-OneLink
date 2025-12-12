import { useMemo, useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { PageLayout } from "@/components/layout/PageLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Loader2, Plus, UploadCloud, Eye, Pencil, FileUp, ChevronDown, ChevronUp, TrendingUp, TrendingDown, Minus, ArrowLeftRight, FileText, X, CheckCircle2, Search, ArrowLeft, DollarSign, AlertTriangle, Home, Trash2, Clock, AlertCircle, FileCheck, PenTool, ArrowRight, Sparkles, BarChart3 } from "lucide-react";

type DocumentStatus = "Uploaded" | "Required" | "Missing";
type ClientStatus = "Active" | "Inactive" | "Prospect";
type PlanType = "RRSP" | "RESP" | "TFSA" | "RRIF" | "Non-Registered" | "LIRA" | "LIF" | "OPEN" | "LRIF";

type Fund = {
  symbol: string;
  name: string;
  company: string;
  category?: string;
};

// Fund database with companies and their funds
const FUND_DATABASE: Fund[] = [
  // Fidelity Funds
  { symbol: "FID001", name: "FIDELITY NORTHSTAR FUND", company: "Fidelity", category: "Equity" },
  { symbol: "FID002", name: "Fidelity Monthly Income Fund - Series B ISC", company: "Fidelity", category: "Income" },
  { symbol: "FID003", name: "Fidelity Canadian Growth Fund", company: "Fidelity", category: "Equity" },
  { symbol: "FID004", name: "Fidelity Global Equity Fund", company: "Fidelity", category: "Equity" },
  { symbol: "FID005", name: "Fidelity Balanced Fund", company: "Fidelity", category: "Balanced" },
  { symbol: "FID006", name: "Fidelity Dividend Fund", company: "Fidelity", category: "Income" },
  { symbol: "FID007", name: "Fidelity International Equity Fund", company: "Fidelity", category: "Equity" },
  { symbol: "FID008", name: "Fidelity Bond Fund", company: "Fidelity", category: "Fixed Income" },
  
  // TD Asset Management Funds
  { symbol: "TD001", name: "TD Monthly Income Fund - Series A", company: "TD Asset Management", category: "Income" },
  { symbol: "TD002", name: "TD Canadian Equity Fund", company: "TD Asset Management", category: "Equity" },
  { symbol: "TD003", name: "TD Balanced Growth Fund", company: "TD Asset Management", category: "Balanced" },
  { symbol: "TD004", name: "TD Global Equity Fund", company: "TD Asset Management", category: "Equity" },
  { symbol: "TD005", name: "TD Dividend Growth Fund", company: "TD Asset Management", category: "Equity" },
  { symbol: "TD006", name: "TD Canadian Bond Fund", company: "TD Asset Management", category: "Fixed Income" },
  { symbol: "TD007", name: "TD International Equity Fund", company: "TD Asset Management", category: "Equity" },
  { symbol: "TD008", name: "TD Money Market Fund", company: "TD Asset Management", category: "Money Market" },
  
  // Vanguard Funds
  { symbol: "VAN001", name: "Vanguard S&P 500 Index ETF", company: "Vanguard", category: "Equity" },
  { symbol: "VAN002", name: "Vanguard FTSE Canada All Cap Index ETF", company: "Vanguard", category: "Equity" },
  { symbol: "VAN003", name: "Vanguard Canadian Aggregate Bond Index ETF", company: "Vanguard", category: "Fixed Income" },
  { symbol: "VAN004", name: "Vanguard Global Equity Index ETF", company: "Vanguard", category: "Equity" },
  { symbol: "VAN005", name: "Vanguard Balanced ETF Portfolio", company: "Vanguard", category: "Balanced" },
  
  // iShares Funds
  { symbol: "ISH001", name: "iShares Core S&P/TSX Capped Composite Index ETF", company: "iShares", category: "Equity" },
  { symbol: "ISH002", name: "iShares Core MSCI All Country World ex Canada Index ETF", company: "iShares", category: "Equity" },
  { symbol: "ISH003", name: "iShares Canadian Corporate Bond Index ETF", company: "iShares", category: "Fixed Income" },
  { symbol: "ISH004", name: "iShares S&P 500 Index ETF", company: "iShares", category: "Equity" },
  
  // BMO Funds
  { symbol: "BMO001", name: "BMO Aggregate Bond Index ETF", company: "BMO", category: "Fixed Income" },
  { symbol: "BMO002", name: "BMO Canadian Equity Fund", company: "BMO", category: "Equity" },
  { symbol: "BMO003", name: "BMO Global Equity Fund", company: "BMO", category: "Equity" },
  { symbol: "BMO004", name: "BMO Balanced Fund", company: "BMO", category: "Balanced" },
  
  // RBC Funds
  { symbol: "RBC001", name: "RBC Canadian Equity Fund", company: "RBC", category: "Equity" },
  { symbol: "RBC002", name: "RBC Global Equity Fund", company: "RBC", category: "Equity" },
  { symbol: "RBC003", name: "RBC Balanced Fund", company: "RBC", category: "Balanced" },
  { symbol: "RBC004", name: "RBC Bond Fund", company: "RBC", category: "Fixed Income" },
  
  // CIBC Funds
  { symbol: "CIBC001", name: "CIBC Canadian Equity Fund", company: "CIBC", category: "Equity" },
  { symbol: "CIBC002", name: "CIBC Global Equity Fund", company: "CIBC", category: "Equity" },
  { symbol: "CIBC003", name: "CIBC Balanced Fund", company: "CIBC", category: "Balanced" },
  
  // Scotia Funds
  { symbol: "SCOT001", name: "Scotia Canadian Equity Fund", company: "Scotia", category: "Equity" },
  { symbol: "SCOT002", name: "Scotia Global Equity Fund", company: "Scotia", category: "Equity" },
  { symbol: "SCOT003", name: "Scotia Balanced Fund", company: "Scotia", category: "Balanced" },
];

type Holding = {
  symbol: string;
  name: string;
  shares: number;
  price: number;
  marketValue: number;
  costBasis: number;
  gainLoss: number;
  gainLossPercent: number;
  assetClass: string;
  sector?: string;
  company?: string;
};

type Plan = {
  id: string;
  type: PlanType;
  accountNumber: string;
  marketValue: number;
  costBasis: number;
  totalGainLoss: number;
  totalGainLossPercent: number;
  holdings: Holding[];
  planCategory?: string;
  accountHolder?: string;
  riskLevel?: string;
  objective?: string;
};

type Client = {
  id: string;
  name: string;
  accountNumber: string;
  email: string;
  phone: string;
  status: ClientStatus;
  documents: DocumentStatus;
  assets: string;
  plans: Plan[];
  recentActivity: { label: string; timestamp: string }[];
  beneficiary?: string;
  contingentBeneficiary?: string;
  dateOfBirth?: string;
  address?: string;
  city?: string;
  province?: string;
  postalCode?: string;
};

export const CLIENTS: Client[] = [
  {
    id: "CL-001",
    name: "John Smith",
    accountNumber: "A-984512",
    email: "smithfamily@clientmail.com",
    phone: "(416) 555-1032",
    status: "Active",
    documents: "Uploaded",
    assets: "$485,230.80",
    plans: [
      {
        id: "P-001",
        type: "RRSP",
        accountNumber: "RRSP-984512",
        marketValue: 82905.00,
        costBasis: 75000.00,
        totalGainLoss: 7905.00,
        totalGainLossPercent: 10.54,
        planCategory: "Individual Plan",
        accountHolder: "Smith, John",
        riskLevel: "Medium",
        objective: "Growth",
        holdings: [
          {
            symbol: "VFV.TO",
            name: "Vanguard S&P 500 Index ETF",
            shares: 450,
            price: 98.50,
            marketValue: 44325.00,
            costBasis: 40000.00,
            gainLoss: 4325.00,
            gainLossPercent: 10.81,
            assetClass: "Equity",
            sector: "Diversified",
          },
          {
            symbol: "XIC.TO",
            name: "iShares Core S&P/TSX Capped Composite Index ETF",
            shares: 1200,
            price: 32.15,
            marketValue: 38580.00,
            costBasis: 35000.00,
            gainLoss: 3580.00,
            gainLossPercent: 10.23,
            assetClass: "Equity",
            sector: "Canadian Equity",
          },
        ],
      },
      {
        id: "P-002",
        type: "TFSA",
        accountNumber: "TFSA-984512",
        marketValue: 107325.00,
        costBasis: 90000.00,
        totalGainLoss: 17325.00,
        totalGainLossPercent: 19.25,
        planCategory: "Individual Plan",
        accountHolder: "Smith, John",
        riskLevel: "Medium",
        objective: "Growth",
        holdings: [
          {
            symbol: "VFV.TO",
            name: "Vanguard S&P 500 Index ETF",
            shares: 600,
            price: 98.50,
            marketValue: 59100.00,
            costBasis: 50000.00,
            gainLoss: 9100.00,
            gainLossPercent: 18.20,
            assetClass: "Equity",
            sector: "Diversified",
          },
          {
            symbol: "XIC.TO",
            name: "iShares Core S&P/TSX Capped Composite Index ETF",
            shares: 1500,
            price: 32.15,
            marketValue: 48225.00,
            costBasis: 40000.00,
            gainLoss: 8225.00,
            gainLossPercent: 20.56,
            assetClass: "Equity",
            sector: "Canadian Equity",
          },
        ],
      },
      {
        id: "P-003",
        type: "Non-Registered",
        accountNumber: "NR-984512",
        marketValue: 73650.00,
        costBasis: 70000.00,
        totalGainLoss: 3650.00,
        totalGainLossPercent: 5.21,
        planCategory: "Individual Plan",
        accountHolder: "Smith, John",
        riskLevel: "Medium",
        objective: "Growth",
        holdings: [
          {
            symbol: "XAW.TO",
            name: "iShares Core MSCI All Country World ex Canada Index ETF",
            shares: 500,
            price: 78.90,
            marketValue: 39450.00,
            costBasis: 35000.00,
            gainLoss: 4450.00,
            gainLossPercent: 12.71,
            assetClass: "Equity",
            sector: "International Equity",
          },
          {
            symbol: "VCN.TO",
            name: "Vanguard FTSE Canada All Cap Index ETF",
            shares: 800,
            price: 42.75,
            marketValue: 34200.00,
            costBasis: 35000.00,
            gainLoss: -800.00,
            gainLossPercent: -2.29,
            assetClass: "Equity",
            sector: "Canadian Equity",
          },
        ],
      },
      {
        id: "P-004",
        type: "RESP",
        accountNumber: "3238677748",
        marketValue: 65120.00,
        costBasis: 55000.00,
        totalGainLoss: 10120.00,
        totalGainLossPercent: 18.40,
        planCategory: "Family Plan",
        accountHolder: "Smith, John",
        riskLevel: "Medium",
        objective: "Speculation",
        holdings: [
          {
            symbol: "VFV.TO",
            name: "Vanguard S&P 500 Index ETF",
            shares: 400,
            price: 98.50,
            marketValue: 39400.00,
            costBasis: 35000.00,
            gainLoss: 4400.00,
            gainLossPercent: 12.57,
            assetClass: "Equity",
            sector: "Diversified",
          },
          {
            symbol: "XIC.TO",
            name: "iShares Core S&P/TSX Capped Composite Index ETF",
            shares: 800,
            price: 32.15,
            marketValue: 25720.00,
            costBasis: 20000.00,
            gainLoss: 5720.00,
            gainLossPercent: 28.60,
            assetClass: "Equity",
            sector: "Canadian Equity",
          },
        ],
      },
    ],
    recentActivity: [
      { label: "Fund purchase • $25,000", timestamp: "Today • 2:45 PM" },
      { label: "Portfolio review completed", timestamp: "Oct 29 • 9:12 AM" },
    ],
    beneficiary: "Sarah Smith",
    contingentBeneficiary: "Michael Smith",
    dateOfBirth: "1975-03-15",
    address: "123 Maple Street",
    city: "Toronto",
    province: "ON",
    postalCode: "M5H 2N2",
  },
  {
    id: "CL-002",
    name: "Robert Johnson",
    accountNumber: "A-572341",
    email: "johnson.retire@clientmail.com",
    phone: "(905) 555-4420",
    status: "Active",
    documents: "Required",
    assets: "$320,850.00",
    plans: [
      {
        id: "P-004",
        type: "RRSP",
        accountNumber: "RRSP-572341",
        marketValue: 182500.00,
        costBasis: 160000.00,
        totalGainLoss: 22500.00,
        totalGainLossPercent: 14.06,
        holdings: [
          {
            symbol: "VFV.TO",
            name: "Vanguard S&P 500 Index ETF",
            shares: 1200,
            price: 98.50,
            marketValue: 118200.00,
            costBasis: 100000.00,
            gainLoss: 18200.00,
            gainLossPercent: 18.20,
            assetClass: "Equity",
            sector: "Diversified",
          },
          {
            symbol: "XIC.TO",
            name: "iShares Core S&P/TSX Capped Composite Index ETF",
            shares: 2000,
            price: 32.15,
            marketValue: 64300.00,
            costBasis: 60000.00,
            gainLoss: 4300.00,
            gainLossPercent: 7.17,
            assetClass: "Equity",
            sector: "Canadian Equity",
          },
        ],
      },
      {
        id: "P-005",
        type: "RRIF",
        accountNumber: "RRIF-572341",
        marketValue: 100000.00,
        costBasis: 95000.00,
        totalGainLoss: 5000.00,
        totalGainLossPercent: 5.26,
        holdings: [
          {
            symbol: "VAB.TO",
            name: "Vanguard Canadian Aggregate Bond Index ETF",
            shares: 3000,
            price: 27.15,
            marketValue: 81450.00,
            costBasis: 80000.00,
            gainLoss: 1450.00,
            gainLossPercent: 1.81,
            assetClass: "Fixed Income",
            sector: "Bonds",
          },
          {
            symbol: "XIC.TO",
            name: "iShares Core S&P/TSX Capped Composite Index ETF",
            shares: 580,
            price: 32.15,
            marketValue: 18647.00,
            costBasis: 15000.00,
            gainLoss: 3647.00,
            gainLossPercent: 24.31,
            assetClass: "Equity",
            sector: "Canadian Equity",
          },
        ],
      },
    ],
    recentActivity: [
      { label: "Dividend distribution • $1,250", timestamp: "Today • 9:00 AM" },
      { label: "Document package sent for signature", timestamp: "Nov 6 • 1:22 PM" },
    ],
  },
  {
    id: "CL-003",
    name: "Michael Williams",
    accountNumber: "A-441205",
    email: "williams.edusave@clientmail.com",
    phone: "(519) 555-8832",
    status: "Inactive",
    documents: "Missing",
    assets: "$125,430.50",
    plans: [
      {
        id: "P-006",
        type: "RESP",
        accountNumber: "RESP-441205",
        marketValue: 110950.00,
        costBasis: 90000.00,
        totalGainLoss: 20950.00,
        totalGainLossPercent: 23.28,
        holdings: [
          {
            symbol: "VFV.TO",
            name: "Vanguard S&P 500 Index ETF",
            shares: 800,
            price: 98.50,
            marketValue: 78800.00,
            costBasis: 60000.00,
            gainLoss: 18800.00,
            gainLossPercent: 31.33,
            assetClass: "Equity",
            sector: "Diversified",
          },
          {
            symbol: "XIC.TO",
            name: "iShares Core S&P/TSX Capped Composite Index ETF",
            shares: 1000,
            price: 32.15,
            marketValue: 32150.00,
            costBasis: 30000.00,
            gainLoss: 2150.00,
            gainLossPercent: 7.17,
            assetClass: "Equity",
            sector: "Canadian Equity",
          },
        ],
      },
    ],
    recentActivity: [
      { label: "Rebalance executed • -$5,500", timestamp: "Yesterday • 3:35 PM" },
      { label: "Compliance reminder issued", timestamp: "Nov 4 • 8:20 AM" },
    ],
  },
  {
    id: "CL-004",
    name: "Patricia Brown",
    accountNumber: "A-228904",
    email: "brown.emergency@clientmail.com",
    phone: "(647) 555-6624",
    status: "Active",
    documents: "Uploaded",
    assets: "$45,200.00",
    plans: [
      {
        id: "P-007",
        type: "TFSA",
        accountNumber: "TFSA-228904",
        marketValue: 45200.00,
        costBasis: 40000.00,
        totalGainLoss: 5200.00,
        totalGainLossPercent: 13.00,
        holdings: [
          {
            symbol: "XIC.TO",
            name: "iShares Core S&P/TSX Capped Composite Index ETF",
            shares: 1400,
            price: 32.15,
            marketValue: 45010.00,
            costBasis: 40000.00,
            gainLoss: 5010.00,
            gainLossPercent: 12.53,
            assetClass: "Equity",
            sector: "Canadian Equity",
          },
          {
            symbol: "VFV.TO",
            name: "Vanguard S&P 500 Index ETF",
            shares: 2,
            price: 98.50,
            marketValue: 197.00,
            costBasis: 0.00,
            gainLoss: 197.00,
            gainLossPercent: 0.00,
            assetClass: "Equity",
            sector: "Diversified",
          },
        ],
      },
    ],
    recentActivity: [
      { label: "Deposit posted • $10,000", timestamp: "Yesterday • 11:15 AM" },
      { label: "Annual review scheduled", timestamp: "Nov 2 • 4:05 PM" },
    ],
  },
  {
    id: "CL-005",
    name: "David Chen",
    accountNumber: "A-663920",
    email: "evergreen.wealth@clientmail.com",
    phone: "(905) 555-1188",
    status: "Prospect",
    documents: "Required",
    assets: "$612,450.00",
    plans: [
      {
        id: "P-008",
        type: "RRSP",
        accountNumber: "RRSP-663920",
        marketValue: 300000.00,
        costBasis: 280000.00,
        totalGainLoss: 20000.00,
        totalGainLossPercent: 7.14,
        holdings: [
          {
            symbol: "VFV.TO",
            name: "Vanguard S&P 500 Index ETF",
            shares: 2000,
            price: 98.50,
            marketValue: 197000.00,
            costBasis: 180000.00,
            gainLoss: 17000.00,
            gainLossPercent: 9.44,
            assetClass: "Equity",
            sector: "Diversified",
          },
          {
            symbol: "XIC.TO",
            name: "iShares Core S&P/TSX Capped Composite Index ETF",
            shares: 3200,
            price: 32.15,
            marketValue: 102880.00,
            costBasis: 100000.00,
            gainLoss: 2880.00,
            gainLossPercent: 2.88,
            assetClass: "Equity",
            sector: "Canadian Equity",
          },
        ],
      },
      {
        id: "P-009",
        type: "TFSA",
        accountNumber: "TFSA-663920",
        marketValue: 95000.00,
        costBasis: 87500.00,
        totalGainLoss: 7500.00,
        totalGainLossPercent: 8.57,
        holdings: [
          {
            symbol: "XAW.TO",
            name: "iShares Core MSCI All Country World ex Canada Index ETF",
            shares: 1200,
            price: 78.90,
            marketValue: 94680.00,
            costBasis: 87500.00,
            gainLoss: 7180.00,
            gainLossPercent: 8.21,
            assetClass: "Equity",
            sector: "International Equity",
          },
          {
            symbol: "VFV.TO",
            name: "Vanguard S&P 500 Index ETF",
            shares: 3,
            price: 98.50,
            marketValue: 295.50,
            costBasis: 0.00,
            gainLoss: 295.50,
            gainLossPercent: 0.00,
            assetClass: "Equity",
            sector: "Diversified",
          },
        ],
      },
      {
        id: "P-010",
        type: "Non-Registered",
        accountNumber: "NR-663920",
        marketValue: 144787.50,
        costBasis: 135000.00,
        totalGainLoss: 9787.50,
        totalGainLossPercent: 7.25,
        holdings: [
          {
            symbol: "AAPL",
            name: "Apple Inc.",
            shares: 500,
            price: 175.50,
            marketValue: 87750.00,
            costBasis: 80000.00,
            gainLoss: 7750.00,
            gainLossPercent: 9.69,
            assetClass: "Equity",
            sector: "Technology",
          },
          {
            symbol: "MSFT",
            name: "Microsoft Corporation",
            shares: 150,
            price: 380.25,
            marketValue: 57037.50,
            costBasis: 55000.00,
            gainLoss: 2037.50,
            gainLossPercent: 3.70,
            assetClass: "Equity",
            sector: "Technology",
          },
        ],
      },
      {
        id: "P-011",
        type: "LIRA",
        accountNumber: "LIRA-663920",
        marketValue: 67450.00,
        costBasis: 65000.00,
        totalGainLoss: 2450.00,
        totalGainLossPercent: 3.77,
        holdings: [
          {
            symbol: "VAB.TO",
            name: "Vanguard Canadian Aggregate Bond Index ETF",
            shares: 2480,
            price: 27.15,
            marketValue: 67332.00,
            costBasis: 65000.00,
            gainLoss: 2332.00,
            gainLossPercent: 3.59,
            assetClass: "Fixed Income",
            sector: "Bonds",
          },
          {
            symbol: "ZAG.TO",
            name: "BMO Aggregate Bond Index ETF",
            shares: 7,
            price: 15.82,
            marketValue: 110.74,
            costBasis: 0.00,
            gainLoss: 110.74,
            gainLossPercent: 0.00,
            assetClass: "Fixed Income",
            sector: "Bonds",
          },
        ],
      },
    ],
    recentActivity: [
      { label: "Portfolio switch order submitted", timestamp: "Today • 3:05 PM" },
      { label: "Questionnaire reviewed", timestamp: "Nov 7 • 1:48 PM" },
    ],
  },
  {
    id: "CL-006",
    name: "Sarah Martinez",
    accountNumber: "A-774512",
    email: "aurora.resp@clientmail.com",
    phone: "(613) 555-4410",
    status: "Active",
    documents: "Uploaded",
    assets: "$89,300.00",
    plans: [
      {
        id: "P-012",
        type: "RESP",
        accountNumber: "RESP-774512",
        marketValue: 89300.00,
        costBasis: 75000.00,
        totalGainLoss: 14300.00,
        totalGainLossPercent: 19.07,
        holdings: [
          {
            symbol: "VFV.TO",
            name: "Vanguard S&P 500 Index ETF",
            shares: 600,
            price: 98.50,
            marketValue: 59100.00,
            costBasis: 50000.00,
            gainLoss: 9100.00,
            gainLossPercent: 18.20,
            assetClass: "Equity",
            sector: "Diversified",
          },
          {
            symbol: "XIC.TO",
            name: "iShares Core S&P/TSX Capped Composite Index ETF",
            shares: 940,
            price: 32.15,
            marketValue: 30221.00,
            costBasis: 25000.00,
            gainLoss: 5221.00,
            gainLossPercent: 20.88,
            assetClass: "Equity",
            sector: "Canadian Equity",
          },
        ],
      },
    ],
    recentActivity: [
      { label: "Contribution posted • $6,000", timestamp: "Nov 6 • 9:44 AM" },
      { label: "Beneficiary update approved", timestamp: "Nov 4 • 5:30 PM" },
    ],
  },
  {
    id: "CL-007",
    name: "James Harper",
    accountNumber: "A-990214",
    email: "harper.estate@clientmail.com",
    phone: "(416) 555-7712",
    status: "Inactive",
    documents: "Missing",
    assets: "$742,900.00",
    plans: [
      {
        id: "P-013",
        type: "RRSP",
        accountNumber: "RRSP-990214",
        marketValue: 400000.00,
        costBasis: 350000.00,
        totalGainLoss: 50000.00,
        totalGainLossPercent: 14.29,
        holdings: [
          {
            symbol: "VFV.TO",
            name: "Vanguard S&P 500 Index ETF",
            shares: 2500,
            price: 98.50,
            marketValue: 246250.00,
            costBasis: 200000.00,
            gainLoss: 46250.00,
            gainLossPercent: 23.13,
            assetClass: "Equity",
            sector: "Diversified",
          },
          {
            symbol: "XIC.TO",
            name: "iShares Core S&P/TSX Capped Composite Index ETF",
            shares: 4780,
            price: 32.15,
            marketValue: 153677.00,
            costBasis: 150000.00,
            gainLoss: 3677.00,
            gainLossPercent: 2.45,
            assetClass: "Equity",
            sector: "Canadian Equity",
          },
        ],
      },
      {
        id: "P-014",
        type: "TFSA",
        accountNumber: "TFSA-990214",
        marketValue: 95000.00,
        costBasis: 87500.00,
        totalGainLoss: 7500.00,
        totalGainLossPercent: 8.57,
        holdings: [
          {
            symbol: "XAW.TO",
            name: "iShares Core MSCI All Country World ex Canada Index ETF",
            shares: 1200,
            price: 78.90,
            marketValue: 94680.00,
            costBasis: 87500.00,
            gainLoss: 7180.00,
            gainLossPercent: 8.21,
            assetClass: "Equity",
            sector: "International Equity",
          },
          {
            symbol: "VFV.TO",
            name: "Vanguard S&P 500 Index ETF",
            shares: 3,
            price: 98.50,
            marketValue: 295.50,
            costBasis: 0.00,
            gainLoss: 295.50,
            gainLossPercent: 0.00,
            assetClass: "Equity",
            sector: "Diversified",
          },
        ],
      },
      {
        id: "P-015",
        type: "Non-Registered",
        accountNumber: "NR-990214",
        marketValue: 200000.00,
        costBasis: 180000.00,
        totalGainLoss: 20000.00,
        totalGainLossPercent: 11.11,
        holdings: [
          {
            symbol: "AAPL",
            name: "Apple Inc.",
            shares: 800,
            price: 175.50,
            marketValue: 140400.00,
            costBasis: 120000.00,
            gainLoss: 20400.00,
            gainLossPercent: 17.00,
            assetClass: "Equity",
            sector: "Technology",
          },
          {
            symbol: "MSFT",
            name: "Microsoft Corporation",
            shares: 150,
            price: 380.25,
            marketValue: 57037.50,
            costBasis: 60000.00,
            gainLoss: -2962.50,
            gainLossPercent: -4.94,
            assetClass: "Equity",
            sector: "Technology",
          },
        ],
      },
      {
        id: "P-016",
        type: "RRIF",
        accountNumber: "RRIF-990214",
        marketValue: 30000.00,
        costBasis: 28000.00,
        totalGainLoss: 2000.00,
        totalGainLossPercent: 7.14,
        holdings: [
          {
            symbol: "VAB.TO",
            name: "Vanguard Canadian Aggregate Bond Index ETF",
            shares: 1105,
            price: 27.15,
            marketValue: 30000.75,
            costBasis: 28000.00,
            gainLoss: 2000.75,
            gainLossPercent: 7.15,
            assetClass: "Fixed Income",
            sector: "Bonds",
          },
          {
            symbol: "ZAG.TO",
            name: "BMO Aggregate Bond Index ETF",
            shares: 0,
            price: 15.82,
            marketValue: 0.00,
            costBasis: 0.00,
            gainLoss: 0.00,
            gainLossPercent: 0.00,
            assetClass: "Fixed Income",
            sector: "Bonds",
          },
        ],
      },
      {
        id: "P-017",
        type: "LIRA",
        accountNumber: "LIRA-990214",
        marketValue: 17900.00,
        costBasis: 17500.00,
        totalGainLoss: 400.00,
        totalGainLossPercent: 2.29,
        holdings: [
          {
            symbol: "ZAG.TO",
            name: "BMO Aggregate Bond Index ETF",
            shares: 1130,
            price: 15.82,
            marketValue: 17876.60,
            costBasis: 17500.00,
            gainLoss: 376.60,
            gainLossPercent: 2.15,
            assetClass: "Fixed Income",
            sector: "Bonds",
          },
          {
            symbol: "VAB.TO",
            name: "Vanguard Canadian Aggregate Bond Index ETF",
            shares: 1,
            price: 27.15,
            marketValue: 27.15,
            costBasis: 0.00,
            gainLoss: 27.15,
            gainLossPercent: 0.00,
            assetClass: "Fixed Income",
            sector: "Bonds",
          },
        ],
      },
    ],
    recentActivity: [
      { label: "Suitability review overdue", timestamp: "Nov 5 • 8:00 AM" },
      { label: "Advisory fee processed • -$325", timestamp: "Nov 3 • 1:10 PM" },
    ],
  },
  {
    id: "CL-008",
    name: "Jennifer Anderson",
    accountNumber: "A-552031",
    email: "maple.holdings@clientmail.com",
    phone: "(780) 555-2020",
    status: "Active",
    documents: "Required",
    assets: "$1,102,340.00",
    plans: [
      {
        id: "P-018",
        type: "RRSP",
        accountNumber: "RRSP-552031",
        marketValue: 600000.00,
        costBasis: 550000.00,
        totalGainLoss: 50000.00,
        totalGainLossPercent: 9.09,
        holdings: [
          {
            symbol: "VFV.TO",
            name: "Vanguard S&P 500 Index ETF",
            shares: 4000,
            price: 98.50,
            marketValue: 394000.00,
            costBasis: 360000.00,
            gainLoss: 34000.00,
            gainLossPercent: 9.44,
            assetClass: "Equity",
            sector: "Diversified",
          },
          {
            symbol: "XIC.TO",
            name: "iShares Core S&P/TSX Capped Composite Index ETF",
            shares: 6400,
            price: 32.15,
            marketValue: 205760.00,
            costBasis: 190000.00,
            gainLoss: 15760.00,
            gainLossPercent: 8.29,
            assetClass: "Equity",
            sector: "Canadian Equity",
          },
        ],
      },
      {
        id: "P-019",
        type: "TFSA",
        accountNumber: "TFSA-552031",
        marketValue: 95000.00,
        costBasis: 87500.00,
        totalGainLoss: 7500.00,
        totalGainLossPercent: 8.57,
        holdings: [
          {
            symbol: "XAW.TO",
            name: "iShares Core MSCI All Country World ex Canada Index ETF",
            shares: 1200,
            price: 78.90,
            marketValue: 94680.00,
            costBasis: 87500.00,
            gainLoss: 7180.00,
            gainLossPercent: 8.21,
            assetClass: "Equity",
            sector: "International Equity",
          },
          {
            symbol: "VFV.TO",
            name: "Vanguard S&P 500 Index ETF",
            shares: 3,
            price: 98.50,
            marketValue: 295.50,
            costBasis: 0.00,
            gainLoss: 295.50,
            gainLossPercent: 0.00,
            assetClass: "Equity",
            sector: "Diversified",
          },
        ],
      },
      {
        id: "P-020",
        type: "Non-Registered",
        accountNumber: "NR-552031",
        marketValue: 362700.00,
        costBasis: 340000.00,
        totalGainLoss: 22700.00,
        totalGainLossPercent: 6.68,
        holdings: [
          {
            symbol: "AAPL",
            name: "Apple Inc.",
            shares: 1200,
            price: 175.50,
            marketValue: 210600.00,
            costBasis: 190000.00,
            gainLoss: 20600.00,
            gainLossPercent: 10.84,
            assetClass: "Equity",
            sector: "Technology",
          },
          {
            symbol: "MSFT",
            name: "Microsoft Corporation",
            shares: 400,
            price: 380.25,
            marketValue: 152100.00,
            costBasis: 150000.00,
            gainLoss: 2100.00,
            gainLossPercent: 1.40,
            assetClass: "Equity",
            sector: "Technology",
          },
        ],
      },
    ],
    recentActivity: [
      { label: "Redemption request • -$18,600", timestamp: "Nov 5 • 2:15 PM" },
      { label: "Document update requested", timestamp: "Nov 2 • 10:05 AM" },
    ],
  },
  {
    id: "CL-009",
    name: "Christopher Taylor",
    accountNumber: "A-336781",
    email: "sunrise.portfolio@clientmail.com",
    phone: "(587) 555-9094",
    status: "Active",
    documents: "Uploaded",
    assets: "$389,780.00",
    plans: [
      {
        id: "P-021",
        type: "RRSP",
        accountNumber: "RRSP-336781",
        marketValue: 250000.00,
        costBasis: 230000.00,
        totalGainLoss: 20000.00,
        totalGainLossPercent: 8.70,
        holdings: [
          {
            symbol: "VFV.TO",
            name: "Vanguard S&P 500 Index ETF",
            shares: 2000,
            price: 98.50,
            marketValue: 197000.00,
            costBasis: 180000.00,
            gainLoss: 17000.00,
            gainLossPercent: 9.44,
            assetClass: "Equity",
            sector: "Diversified",
          },
          {
            symbol: "XIC.TO",
            name: "iShares Core S&P/TSX Capped Composite Index ETF",
            shares: 1650,
            price: 32.15,
            marketValue: 53047.50,
            costBasis: 50000.00,
            gainLoss: 3047.50,
            gainLossPercent: 6.10,
            assetClass: "Equity",
            sector: "Canadian Equity",
          },
        ],
      },
      {
        id: "P-022",
        type: "TFSA",
        accountNumber: "TFSA-336781",
        marketValue: 139780.00,
        costBasis: 130000.00,
        totalGainLoss: 9780.00,
        totalGainLossPercent: 7.52,
        holdings: [
          {
            symbol: "XAW.TO",
            name: "iShares Core MSCI All Country World ex Canada Index ETF",
            shares: 1770,
            price: 78.90,
            marketValue: 139653.00,
            costBasis: 130000.00,
            gainLoss: 9653.00,
            gainLossPercent: 7.43,
            assetClass: "Equity",
            sector: "International Equity",
          },
          {
            symbol: "VFV.TO",
            name: "Vanguard S&P 500 Index ETF",
            shares: 1,
            price: 98.50,
            marketValue: 98.50,
            costBasis: 0.00,
            gainLoss: 98.50,
            gainLossPercent: 0.00,
            assetClass: "Equity",
            sector: "Diversified",
          },
        ],
      },
    ],
    recentActivity: [
      { label: "Switch order executed • -$12,750", timestamp: "Nov 4 • 4:22 PM" },
      { label: "Document confirmation logged", timestamp: "Nov 1 • 2:40 PM" },
    ],
  },
  {
    id: "CL-010",
    name: "Amanda Wilson",
    accountNumber: "A-884512",
    email: "cedar.ridge@clientmail.com",
    phone: "(431) 555-0055",
    status: "Prospect",
    documents: "Required",
    assets: "$214,600.00",
    plans: [
      {
        id: "P-023",
        type: "RRSP",
        accountNumber: "RRSP-884512",
        marketValue: 214600.00,
        costBasis: 200000.00,
        totalGainLoss: 14600.00,
        totalGainLossPercent: 7.30,
        holdings: [
          {
            symbol: "VFV.TO",
            name: "Vanguard S&P 500 Index ETF",
            shares: 1500,
            price: 98.50,
            marketValue: 147750.00,
            costBasis: 130000.00,
            gainLoss: 17750.00,
            gainLossPercent: 13.65,
            assetClass: "Equity",
            sector: "Diversified",
          },
          {
            symbol: "XIC.TO",
            name: "iShares Core S&P/TSX Capped Composite Index ETF",
            shares: 2080,
            price: 32.15,
            marketValue: 66872.00,
            costBasis: 70000.00,
            gainLoss: -3128.00,
            gainLossPercent: -4.47,
            assetClass: "Equity",
            sector: "Canadian Equity",
          },
        ],
      },
    ],
    recentActivity: [
      { label: "Document upload requested", timestamp: "Nov 7 • 5:55 PM" },
      { label: "Initial client onboarding started", timestamp: "Nov 6 • 10:30 AM" },
    ],
  },
  {
    id: "CL-011",
    name: "Lisa Thompson",
    accountNumber: "A-112233",
    email: "lisa.thompson@clientmail.com",
    phone: "(416) 555-1122",
    status: "Active",
    documents: "Uploaded",
    assets: "$156,780.00",
    plans: [
      {
        id: "P-024",
        type: "RRSP",
        accountNumber: "RRSP-112233",
        marketValue: 156780.00,
        costBasis: 145000.00,
        totalGainLoss: 11780.00,
        totalGainLossPercent: 8.12,
        planCategory: "Individual Plan",
        accountHolder: "Thompson, Lisa",
        riskLevel: "Medium",
        objective: "Growth",
        holdings: [
          {
            symbol: "VFV.TO",
            name: "Vanguard S&P 500 Index ETF",
            shares: 1000,
            price: 98.50,
            marketValue: 98500.00,
            costBasis: 90000.00,
            gainLoss: 8500.00,
            gainLossPercent: 9.44,
            assetClass: "Equity",
            sector: "Diversified",
          },
          {
            symbol: "XIC.TO",
            name: "iShares Core S&P/TSX Capped Composite Index ETF",
            shares: 1800,
            price: 32.15,
            marketValue: 57870.00,
            costBasis: 55000.00,
            gainLoss: 2870.00,
            gainLossPercent: 5.22,
            assetClass: "Equity",
            sector: "Canadian Equity",
          },
        ],
      },
    ],
    recentActivity: [
      { label: "Monthly contribution • $500", timestamp: "Nov 7 • 8:00 AM" },
      { label: "Portfolio rebalance completed", timestamp: "Nov 5 • 2:30 PM" },
    ],
  },
  {
    id: "CL-012",
    name: "Daniel Rodriguez",
    accountNumber: "A-223344",
    email: "daniel.rodriguez@clientmail.com",
    phone: "(647) 555-2233",
    status: "Active",
    documents: "Uploaded",
    assets: "$289,450.00",
    plans: [
      {
        id: "P-025",
        type: "TFSA",
        accountNumber: "TFSA-223344",
        marketValue: 125000.00,
        costBasis: 110000.00,
        totalGainLoss: 15000.00,
        totalGainLossPercent: 13.64,
        planCategory: "Individual Plan",
        accountHolder: "Rodriguez, Daniel",
        riskLevel: "Aggressive",
        objective: "Growth",
        holdings: [
          {
            symbol: "XAW.TO",
            name: "iShares Core MSCI All Country World ex Canada Index ETF",
            shares: 1585,
            price: 78.90,
            marketValue: 125056.50,
            costBasis: 110000.00,
            gainLoss: 15056.50,
            gainLossPercent: 13.69,
            assetClass: "Equity",
            sector: "International Equity",
          },
          {
            symbol: "VFV.TO",
            name: "Vanguard S&P 500 Index ETF",
            shares: 0,
            price: 98.50,
            marketValue: 0.00,
            costBasis: 0.00,
            gainLoss: 0.00,
            gainLossPercent: 0.00,
            assetClass: "Equity",
            sector: "Diversified",
          },
        ],
      },
      {
        id: "P-026",
        type: "Non-Registered",
        accountNumber: "NR-223344",
        marketValue: 164450.00,
        costBasis: 150000.00,
        totalGainLoss: 14450.00,
        totalGainLossPercent: 9.63,
        planCategory: "Individual Plan",
        accountHolder: "Rodriguez, Daniel",
        riskLevel: "Aggressive",
        objective: "Growth",
        holdings: [
          {
            symbol: "AAPL",
            name: "Apple Inc.",
            shares: 500,
            price: 175.50,
            marketValue: 87750.00,
            costBasis: 80000.00,
            gainLoss: 7750.00,
            gainLossPercent: 9.69,
            assetClass: "Equity",
            sector: "Technology",
          },
          {
            symbol: "MSFT",
            name: "Microsoft Corporation",
            shares: 200,
            price: 380.25,
            marketValue: 76050.00,
            costBasis: 70000.00,
            gainLoss: 6050.00,
            gainLossPercent: 8.64,
            assetClass: "Equity",
            sector: "Technology",
          },
        ],
      },
    ],
    recentActivity: [
      { label: "Stock purchase • $15,000", timestamp: "Nov 6 • 11:20 AM" },
      { label: "Dividend received • $450", timestamp: "Nov 4 • 3:15 PM" },
    ],
  },
  {
    id: "CL-013",
    name: "Emily Davis",
    accountNumber: "A-334455",
    email: "emily.davis@clientmail.com",
    phone: "(905) 555-3344",
    status: "Active",
    documents: "Uploaded",
    assets: "$98,230.00",
    plans: [
      {
        id: "P-027",
        type: "RESP",
        accountNumber: "RESP-334455",
        marketValue: 98230.00,
        costBasis: 85000.00,
        totalGainLoss: 13230.00,
        totalGainLossPercent: 15.56,
        planCategory: "Family Plan",
        accountHolder: "Davis, Emily",
        riskLevel: "Medium",
        objective: "Education",
        holdings: [
          {
            symbol: "VFV.TO",
            name: "Vanguard S&P 500 Index ETF",
            shares: 700,
            price: 98.50,
            marketValue: 68950.00,
            costBasis: 60000.00,
            gainLoss: 8950.00,
            gainLossPercent: 14.92,
            assetClass: "Equity",
            sector: "Diversified",
          },
          {
            symbol: "XIC.TO",
            name: "iShares Core S&P/TSX Capped Composite Index ETF",
            shares: 910,
            price: 32.15,
            marketValue: 29256.50,
            costBasis: 25000.00,
            gainLoss: 4256.50,
            gainLossPercent: 17.03,
            assetClass: "Equity",
            sector: "Canadian Equity",
          },
        ],
      },
    ],
    recentActivity: [
      { label: "Government grant received • $500", timestamp: "Nov 6 • 9:00 AM" },
      { label: "Annual contribution • $2,500", timestamp: "Nov 3 • 10:45 AM" },
    ],
  },
  {
    id: "CL-014",
    name: "Mark Thompson",
    accountNumber: "A-445566",
    email: "mark.thompson@clientmail.com",
    phone: "(519) 555-4455",
    status: "Active",
    documents: "Required",
    assets: "$412,890.00",
    plans: [
      {
        id: "P-028",
        type: "RRSP",
        accountNumber: "RRSP-445566",
        marketValue: 250000.00,
        costBasis: 230000.00,
        totalGainLoss: 20000.00,
        totalGainLossPercent: 8.70,
        planCategory: "Individual Plan",
        accountHolder: "Thompson, Mark",
        riskLevel: "Medium",
        objective: "Retirement",
        holdings: [
          {
            symbol: "VFV.TO",
            name: "Vanguard S&P 500 Index ETF",
            shares: 2000,
            price: 98.50,
            marketValue: 197000.00,
            costBasis: 180000.00,
            gainLoss: 17000.00,
            gainLossPercent: 9.44,
            assetClass: "Equity",
            sector: "Diversified",
          },
          {
            symbol: "VAB.TO",
            name: "Vanguard Canadian Aggregate Bond Index ETF",
            shares: 1950,
            price: 27.15,
            marketValue: 52942.50,
            costBasis: 50000.00,
            gainLoss: 2942.50,
            gainLossPercent: 5.89,
            assetClass: "Fixed Income",
            sector: "Bonds",
          },
        ],
      },
      {
        id: "P-029",
        type: "RRIF",
        accountNumber: "RRIF-445566",
        marketValue: 162890.00,
        costBasis: 150000.00,
        totalGainLoss: 12890.00,
        totalGainLossPercent: 8.59,
        planCategory: "Individual Plan",
        accountHolder: "Thompson, Mark",
        riskLevel: "Conservative",
        objective: "Income",
        holdings: [
          {
            symbol: "VAB.TO",
            name: "Vanguard Canadian Aggregate Bond Index ETF",
            shares: 6000,
            price: 27.15,
            marketValue: 162900.00,
            costBasis: 150000.00,
            gainLoss: 12900.00,
            gainLossPercent: 8.60,
            assetClass: "Fixed Income",
            sector: "Bonds",
          },
          {
            symbol: "ZAG.TO",
            name: "BMO Aggregate Bond Index ETF",
            shares: 0,
            price: 15.82,
            marketValue: 0.00,
            costBasis: 0.00,
            gainLoss: 0.00,
            gainLossPercent: 0.00,
            assetClass: "Fixed Income",
            sector: "Bonds",
          },
        ],
      },
    ],
    recentActivity: [
      { label: "RRIF withdrawal • $2,500", timestamp: "Nov 7 • 1:00 PM" },
      { label: "Annual review scheduled", timestamp: "Nov 5 • 9:30 AM" },
    ],
  },
  {
    id: "CL-015",
    name: "Rachel Kim",
    accountNumber: "A-556677",
    email: "rachel.kim@clientmail.com",
    phone: "(613) 555-5566",
    status: "Active",
    documents: "Uploaded",
    assets: "$234,560.00",
    plans: [
      {
        id: "P-030",
        type: "TFSA",
        accountNumber: "TFSA-556677",
        marketValue: 95000.00,
        costBasis: 87500.00,
        totalGainLoss: 7500.00,
        totalGainLossPercent: 8.57,
        planCategory: "Individual Plan",
        accountHolder: "Kim, Rachel",
        riskLevel: "Medium",
        objective: "Growth",
        holdings: [
          {
            symbol: "XAW.TO",
            name: "iShares Core MSCI All Country World ex Canada Index ETF",
            shares: 1200,
            price: 78.90,
            marketValue: 94680.00,
            costBasis: 87500.00,
            gainLoss: 7180.00,
            gainLossPercent: 8.21,
            assetClass: "Equity",
            sector: "International Equity",
          },
          {
            symbol: "VFV.TO",
            name: "Vanguard S&P 500 Index ETF",
            shares: 3,
            price: 98.50,
            marketValue: 295.50,
            costBasis: 0.00,
            gainLoss: 295.50,
            gainLossPercent: 0.00,
            assetClass: "Equity",
            sector: "Diversified",
          },
        ],
      },
      {
        id: "P-031",
        type: "RRSP",
        accountNumber: "RRSP-556677",
        marketValue: 139560.00,
        costBasis: 130000.00,
        totalGainLoss: 9560.00,
        totalGainLossPercent: 7.35,
        planCategory: "Individual Plan",
        accountHolder: "Kim, Rachel",
        riskLevel: "Medium",
        objective: "Growth",
        holdings: [
          {
            symbol: "VFV.TO",
            name: "Vanguard S&P 500 Index ETF",
            shares: 1000,
            price: 98.50,
            marketValue: 98500.00,
            costBasis: 90000.00,
            gainLoss: 8500.00,
            gainLossPercent: 9.44,
            assetClass: "Equity",
            sector: "Diversified",
          },
          {
            symbol: "XIC.TO",
            name: "iShares Core S&P/TSX Capped Composite Index ETF",
            shares: 1280,
            price: 32.15,
            marketValue: 41152.00,
            costBasis: 40000.00,
            gainLoss: 1152.00,
            gainLossPercent: 2.88,
            assetClass: "Equity",
            sector: "Canadian Equity",
          },
        ],
      },
    ],
    recentActivity: [
      { label: "Contribution posted • $6,000", timestamp: "Nov 6 • 2:15 PM" },
      { label: "Portfolio performance review", timestamp: "Nov 4 • 11:00 AM" },
    ],
  },
  {
    id: "CL-016",
    name: "Thomas Anderson",
    accountNumber: "A-667788",
    email: "thomas.anderson@clientmail.com",
    phone: "(416) 555-6677",
    status: "Inactive",
    documents: "Missing",
    assets: "$67,890.00",
    plans: [
      {
        id: "P-032",
        type: "TFSA",
        accountNumber: "TFSA-667788",
        marketValue: 67890.00,
        costBasis: 65000.00,
        totalGainLoss: 2890.00,
        totalGainLossPercent: 4.45,
        planCategory: "Individual Plan",
        accountHolder: "Anderson, Thomas",
        riskLevel: "Conservative",
        objective: "Savings",
        holdings: [
          {
            symbol: "ZAG.TO",
            name: "BMO Aggregate Bond Index ETF",
            shares: 4290,
            price: 15.82,
            marketValue: 67887.80,
            costBasis: 65000.00,
            gainLoss: 2887.80,
            gainLossPercent: 4.44,
            assetClass: "Fixed Income",
            sector: "Bonds",
          },
          {
            symbol: "VAB.TO",
            name: "Vanguard Canadian Aggregate Bond Index ETF",
            shares: 1,
            price: 27.15,
            marketValue: 27.15,
            costBasis: 0.00,
            gainLoss: 27.15,
            gainLossPercent: 0.00,
            assetClass: "Fixed Income",
            sector: "Bonds",
          },
        ],
      },
    ],
    recentActivity: [
      { label: "Account review overdue", timestamp: "Nov 5 • 8:00 AM" },
      { label: "Document request sent", timestamp: "Nov 2 • 3:45 PM" },
    ],
  },
  {
    id: "CL-017",
    name: "Jessica White",
    accountNumber: "A-778899",
    email: "jessica.white@clientmail.com",
    phone: "(905) 555-7788",
    status: "Active",
    documents: "Uploaded",
    assets: "$345,670.00",
    plans: [
      {
        id: "P-033",
        type: "RRSP",
        accountNumber: "RRSP-778899",
        marketValue: 200000.00,
        costBasis: 185000.00,
        totalGainLoss: 15000.00,
        totalGainLossPercent: 8.11,
        planCategory: "Individual Plan",
        accountHolder: "White, Jessica",
        riskLevel: "Medium",
        objective: "Retirement",
        holdings: [
          {
            symbol: "VFV.TO",
            name: "Vanguard S&P 500 Index ETF",
            shares: 1500,
            price: 98.50,
            marketValue: 147750.00,
            costBasis: 135000.00,
            gainLoss: 12750.00,
            gainLossPercent: 9.44,
            assetClass: "Equity",
            sector: "Diversified",
          },
          {
            symbol: "XIC.TO",
            name: "iShares Core S&P/TSX Capped Composite Index ETF",
            shares: 1625,
            price: 32.15,
            marketValue: 52243.75,
            costBasis: 50000.00,
            gainLoss: 2243.75,
            gainLossPercent: 4.49,
            assetClass: "Equity",
            sector: "Canadian Equity",
          },
        ],
      },
      {
        id: "P-034",
        type: "Non-Registered",
        accountNumber: "NR-778899",
        marketValue: 145670.00,
        costBasis: 135000.00,
        totalGainLoss: 10670.00,
        totalGainLossPercent: 7.90,
        planCategory: "Individual Plan",
        accountHolder: "White, Jessica",
        riskLevel: "Medium",
        objective: "Growth",
        holdings: [
          {
            symbol: "GOOGL",
            name: "Alphabet Inc.",
            shares: 600,
            price: 145.30,
            marketValue: 87180.00,
            costBasis: 80000.00,
            gainLoss: 7180.00,
            gainLossPercent: 8.98,
            assetClass: "Equity",
            sector: "Technology",
          },
          {
            symbol: "MSFT",
            name: "Microsoft Corporation",
            shares: 150,
            price: 380.25,
            marketValue: 57037.50,
            costBasis: 55000.00,
            gainLoss: 2037.50,
            gainLossPercent: 3.70,
            assetClass: "Equity",
            sector: "Technology",
          },
        ],
      },
    ],
    recentActivity: [
      { label: "Rebalance executed • $8,500", timestamp: "Nov 7 • 10:30 AM" },
      { label: "Tax loss harvesting", timestamp: "Nov 5 • 4:20 PM" },
    ],
  },
  {
    id: "CL-018",
    name: "Kevin Lee",
    accountNumber: "A-889900",
    email: "kevin.lee@clientmail.com",
    phone: "(647) 555-8899",
    status: "Active",
    documents: "Uploaded",
    assets: "$178,920.00",
    plans: [
      {
        id: "P-035",
        type: "RESP",
        accountNumber: "RESP-889900",
        marketValue: 178920.00,
        costBasis: 160000.00,
        totalGainLoss: 18920.00,
        totalGainLossPercent: 11.83,
        planCategory: "Family Plan",
        accountHolder: "Lee, Kevin",
        riskLevel: "Medium",
        objective: "Education",
        holdings: [
          {
            symbol: "VFV.TO",
            name: "Vanguard S&P 500 Index ETF",
            shares: 1200,
            price: 98.50,
            marketValue: 118200.00,
            costBasis: 105000.00,
            gainLoss: 13200.00,
            gainLossPercent: 12.57,
            assetClass: "Equity",
            sector: "Diversified",
          },
          {
            symbol: "XIC.TO",
            name: "iShares Core S&P/TSX Capped Composite Index ETF",
            shares: 1885,
            price: 32.15,
            marketValue: 60602.75,
            costBasis: 55000.00,
            gainLoss: 5602.75,
            gainLossPercent: 10.19,
            assetClass: "Equity",
            sector: "Canadian Equity",
          },
        ],
      },
    ],
    recentActivity: [
      { label: "Contribution posted • $2,500", timestamp: "Nov 6 • 9:15 AM" },
      { label: "Beneficiary update processed", timestamp: "Nov 4 • 2:00 PM" },
    ],
  },
  {
    id: "CL-019",
    name: "Nicole Garcia",
    accountNumber: "A-990011",
    email: "nicole.garcia@clientmail.com",
    phone: "(519) 555-9900",
    status: "Prospect",
    documents: "Required",
    assets: "$45,230.00",
    plans: [
      {
        id: "P-036",
        type: "TFSA",
        accountNumber: "TFSA-990011",
        marketValue: 45230.00,
        costBasis: 42000.00,
        totalGainLoss: 3230.00,
        totalGainLossPercent: 7.69,
        planCategory: "Individual Plan",
        accountHolder: "Garcia, Nicole",
        riskLevel: "Medium",
        objective: "Growth",
        holdings: [
          {
            symbol: "XIC.TO",
            name: "iShares Core S&P/TSX Capped Composite Index ETF",
            shares: 1407,
            price: 32.15,
            marketValue: 45235.05,
            costBasis: 42000.00,
            gainLoss: 3235.05,
            gainLossPercent: 7.70,
            assetClass: "Equity",
            sector: "Canadian Equity",
          },
          {
            symbol: "VFV.TO",
            name: "Vanguard S&P 500 Index ETF",
            shares: 0,
            price: 98.50,
            marketValue: 0.00,
            costBasis: 0.00,
            gainLoss: 0.00,
            gainLossPercent: 0.00,
            assetClass: "Equity",
            sector: "Diversified",
          },
        ],
      },
    ],
    recentActivity: [
      { label: "Initial deposit • $5,000", timestamp: "Nov 7 • 3:00 PM" },
      { label: "Account setup completed", timestamp: "Nov 6 • 1:30 PM" },
    ],
  },
  {
    id: "CL-020",
    name: "Ryan Murphy",
    accountNumber: "A-001122",
    email: "ryan.murphy@clientmail.com",
    phone: "(613) 555-0011",
    status: "Active",
    documents: "Uploaded",
    assets: "$512,340.00",
    plans: [
      {
        id: "P-037",
        type: "RRSP",
        accountNumber: "RRSP-001122",
        marketValue: 300000.00,
        costBasis: 280000.00,
        totalGainLoss: 20000.00,
        totalGainLossPercent: 7.14,
        planCategory: "Individual Plan",
        accountHolder: "Murphy, Ryan",
        riskLevel: "Medium",
        objective: "Retirement",
        holdings: [
          {
            symbol: "VFV.TO",
            name: "Vanguard S&P 500 Index ETF",
            shares: 2500,
            price: 98.50,
            marketValue: 246250.00,
            costBasis: 230000.00,
            gainLoss: 16250.00,
            gainLossPercent: 7.07,
            assetClass: "Equity",
            sector: "Diversified",
          },
          {
            symbol: "VAB.TO",
            name: "Vanguard Canadian Aggregate Bond Index ETF",
            shares: 1980,
            price: 27.15,
            marketValue: 53757.00,
            costBasis: 50000.00,
            gainLoss: 3757.00,
            gainLossPercent: 7.51,
            assetClass: "Fixed Income",
            sector: "Bonds",
          },
        ],
      },
      {
        id: "P-038",
        type: "LIRA",
        accountNumber: "LIRA-001122",
        marketValue: 212340.00,
        costBasis: 200000.00,
        totalGainLoss: 12340.00,
        totalGainLossPercent: 6.17,
        planCategory: "Individual Plan",
        accountHolder: "Murphy, Ryan",
        riskLevel: "Conservative",
        objective: "Preservation",
        holdings: [
          {
            symbol: "VAB.TO",
            name: "Vanguard Canadian Aggregate Bond Index ETF",
            shares: 7820,
            price: 27.15,
            marketValue: 212313.00,
            costBasis: 200000.00,
            gainLoss: 12313.00,
            gainLossPercent: 6.16,
            assetClass: "Fixed Income",
            sector: "Bonds",
          },
          {
            symbol: "ZAG.TO",
            name: "BMO Aggregate Bond Index ETF",
            shares: 0,
            price: 15.82,
            marketValue: 0.00,
            costBasis: 0.00,
            gainLoss: 0.00,
            gainLossPercent: 0.00,
            assetClass: "Fixed Income",
            sector: "Bonds",
          },
        ],
      },
    ],
    recentActivity: [
      { label: "LIRA transfer completed", timestamp: "Nov 6 • 11:45 AM" },
      { label: "Annual contribution • $18,000", timestamp: "Nov 3 • 9:00 AM" },
    ],
  },
  {
    id: "CL-021",
    name: "Samantha Brown",
    accountNumber: "A-112244",
    email: "samantha.brown@clientmail.com",
    phone: "(416) 555-1122",
    status: "Active",
    documents: "Uploaded",
    assets: "$267,890.00",
    plans: [
      {
        id: "P-039",
        type: "RRSP",
        accountNumber: "RRSP-112244",
        marketValue: 150000.00,
        costBasis: 140000.00,
        totalGainLoss: 10000.00,
        totalGainLossPercent: 7.14,
        planCategory: "Individual Plan",
        accountHolder: "Brown, Samantha",
        riskLevel: "Medium",
        objective: "Retirement",
        holdings: [
          {
            symbol: "VFV.TO",
            name: "Vanguard S&P 500 Index ETF",
            shares: 1200,
            price: 98.50,
            marketValue: 118200.00,
            costBasis: 110000.00,
            gainLoss: 8200.00,
            gainLossPercent: 7.45,
            assetClass: "Equity",
            sector: "Diversified",
          },
          {
            symbol: "XIC.TO",
            name: "iShares Core S&P/TSX Capped Composite Index ETF",
            shares: 990,
            price: 32.15,
            marketValue: 31828.50,
            costBasis: 30000.00,
            gainLoss: 1828.50,
            gainLossPercent: 6.10,
            assetClass: "Equity",
            sector: "Canadian Equity",
          },
        ],
      },
      {
        id: "P-040",
        type: "TFSA",
        accountNumber: "TFSA-112244",
        marketValue: 117890.00,
        costBasis: 110000.00,
        totalGainLoss: 7890.00,
        totalGainLossPercent: 7.17,
        planCategory: "Individual Plan",
        accountHolder: "Brown, Samantha",
        riskLevel: "Medium",
        objective: "Growth",
        holdings: [
          {
            symbol: "XAW.TO",
            name: "iShares Core MSCI All Country World ex Canada Index ETF",
            shares: 1494,
            price: 78.90,
            marketValue: 117886.60,
            costBasis: 110000.00,
            gainLoss: 7886.60,
            gainLossPercent: 7.17,
            assetClass: "Equity",
            sector: "International Equity",
          },
          {
            symbol: "VFV.TO",
            name: "Vanguard S&P 500 Index ETF",
            shares: 0,
            price: 98.50,
            marketValue: 0.00,
            costBasis: 0.00,
            gainLoss: 0.00,
            gainLossPercent: 0.00,
            assetClass: "Equity",
            sector: "Diversified",
          },
        ],
      },
    ],
    recentActivity: [
      { label: "TFSA contribution • $7,000", timestamp: "Nov 7 • 8:30 AM" },
      { label: "Portfolio review meeting", timestamp: "Nov 5 • 2:00 PM" },
    ],
  },
  {
    id: "CL-022",
    name: "Brian Miller",
    accountNumber: "A-223355",
    email: "brian.miller@clientmail.com",
    phone: "(905) 555-2233",
    status: "Active",
    documents: "Uploaded",
    assets: "$389,450.00",
    plans: [
      {
        id: "P-041",
        type: "RRSP",
        accountNumber: "RRSP-223355",
        marketValue: 250000.00,
        costBasis: 230000.00,
        totalGainLoss: 20000.00,
        totalGainLossPercent: 8.70,
        planCategory: "Individual Plan",
        accountHolder: "Miller, Brian",
        riskLevel: "Medium",
        objective: "Retirement",
        holdings: [
          {
            symbol: "VFV.TO",
            name: "Vanguard S&P 500 Index ETF",
            shares: 2000,
            price: 98.50,
            marketValue: 197000.00,
            costBasis: 180000.00,
            gainLoss: 17000.00,
            gainLossPercent: 9.44,
            assetClass: "Equity",
            sector: "Diversified",
          },
          {
            symbol: "XIC.TO",
            name: "iShares Core S&P/TSX Capped Composite Index ETF",
            shares: 1650,
            price: 32.15,
            marketValue: 53047.50,
            costBasis: 50000.00,
            gainLoss: 3047.50,
            gainLossPercent: 6.10,
            assetClass: "Equity",
            sector: "Canadian Equity",
          },
        ],
      },
      {
        id: "P-042",
        type: "Non-Registered",
        accountNumber: "NR-223355",
        marketValue: 139450.00,
        costBasis: 130000.00,
        totalGainLoss: 9450.00,
        totalGainLossPercent: 7.27,
        planCategory: "Individual Plan",
        accountHolder: "Miller, Brian",
        riskLevel: "Medium",
        objective: "Growth",
        holdings: [
          {
            symbol: "AAPL",
            name: "Apple Inc.",
            shares: 500,
            price: 175.50,
            marketValue: 87750.00,
            costBasis: 80000.00,
            gainLoss: 7750.00,
            gainLossPercent: 9.69,
            assetClass: "Equity",
            sector: "Technology",
          },
          {
            symbol: "GOOGL",
            name: "Alphabet Inc.",
            shares: 350,
            price: 145.30,
            marketValue: 50855.00,
            costBasis: 50000.00,
            gainLoss: 855.00,
            gainLossPercent: 1.71,
            assetClass: "Equity",
            sector: "Technology",
          },
        ],
      },
    ],
    recentActivity: [
      { label: "Stock purchase • $20,000", timestamp: "Nov 6 • 1:45 PM" },
      { label: "Dividend reinvestment", timestamp: "Nov 4 • 10:00 AM" },
    ],
  },
  {
    id: "CL-023",
    name: "Michelle Taylor",
    accountNumber: "A-334466",
    email: "michelle.taylor@clientmail.com",
    phone: "(647) 555-3344",
    status: "Active",
    documents: "Uploaded",
    assets: "$145,670.00",
    plans: [
      {
        id: "P-043",
        type: "TFSA",
        accountNumber: "TFSA-334466",
        marketValue: 95000.00,
        costBasis: 87500.00,
        totalGainLoss: 7500.00,
        totalGainLossPercent: 8.57,
        planCategory: "Individual Plan",
        accountHolder: "Taylor, Michelle",
        riskLevel: "Medium",
        objective: "Growth",
        holdings: [
          {
            symbol: "XAW.TO",
            name: "iShares Core MSCI All Country World ex Canada Index ETF",
            shares: 1200,
            price: 78.90,
            marketValue: 94680.00,
            costBasis: 87500.00,
            gainLoss: 7180.00,
            gainLossPercent: 8.21,
            assetClass: "Equity",
            sector: "International Equity",
          },
          {
            symbol: "VFV.TO",
            name: "Vanguard S&P 500 Index ETF",
            shares: 3,
            price: 98.50,
            marketValue: 295.50,
            costBasis: 0.00,
            gainLoss: 295.50,
            gainLossPercent: 0.00,
            assetClass: "Equity",
            sector: "Diversified",
          },
        ],
      },
      {
        id: "P-044",
        type: "RRSP",
        accountNumber: "RRSP-334466",
        marketValue: 50670.00,
        costBasis: 48000.00,
        totalGainLoss: 2670.00,
        totalGainLossPercent: 5.56,
        planCategory: "Individual Plan",
        accountHolder: "Taylor, Michelle",
        riskLevel: "Medium",
        objective: "Retirement",
        holdings: [
          {
            symbol: "VFV.TO",
            name: "Vanguard S&P 500 Index ETF",
            shares: 400,
            price: 98.50,
            marketValue: 39400.00,
            costBasis: 36000.00,
            gainLoss: 3400.00,
            gainLossPercent: 9.44,
            assetClass: "Equity",
            sector: "Diversified",
          },
          {
            symbol: "ZAG.TO",
            name: "BMO Aggregate Bond Index ETF",
            shares: 710,
            price: 15.82,
            marketValue: 11232.20,
            costBasis: 12000.00,
            gainLoss: -767.80,
            gainLossPercent: -6.40,
            assetClass: "Fixed Income",
            sector: "Bonds",
          },
        ],
      },
    ],
    recentActivity: [
      { label: "Monthly contribution • $500", timestamp: "Nov 7 • 9:00 AM" },
      { label: "Account statement generated", timestamp: "Nov 5 • 3:30 PM" },
    ],
  },
  {
    id: "CL-024",
    name: "Andrew Wilson",
    accountNumber: "A-445577",
    email: "andrew.wilson@clientmail.com",
    phone: "(519) 555-4455",
    status: "Inactive",
    documents: "Missing",
    assets: "$89,230.00",
    plans: [
      {
        id: "P-045",
        type: "RRSP",
        accountNumber: "RRSP-445577",
        marketValue: 89230.00,
        costBasis: 85000.00,
        totalGainLoss: 4230.00,
        totalGainLossPercent: 4.98,
        planCategory: "Individual Plan",
        accountHolder: "Wilson, Andrew",
        riskLevel: "Conservative",
        objective: "Retirement",
        holdings: [
          {
            symbol: "VAB.TO",
            name: "Vanguard Canadian Aggregate Bond Index ETF",
            shares: 3288,
            price: 27.15,
            marketValue: 89269.20,
            costBasis: 85000.00,
            gainLoss: 4269.20,
            gainLossPercent: 5.02,
            assetClass: "Fixed Income",
            sector: "Bonds",
          },
          {
            symbol: "ZAG.TO",
            name: "BMO Aggregate Bond Index ETF",
            shares: 0,
            price: 15.82,
            marketValue: 0.00,
            costBasis: 0.00,
            gainLoss: 0.00,
            gainLossPercent: 0.00,
            assetClass: "Fixed Income",
            sector: "Bonds",
          },
        ],
      },
    ],
    recentActivity: [
      { label: "Account review overdue", timestamp: "Nov 5 • 8:00 AM" },
      { label: "Contact information update needed", timestamp: "Nov 2 • 4:15 PM" },
    ],
  },
  {
    id: "CL-025",
    name: "Stephanie Moore",
    accountNumber: "A-556688",
    email: "stephanie.moore@clientmail.com",
    phone: "(613) 555-5566",
    status: "Active",
    documents: "Uploaded",
    assets: "$312,450.00",
    plans: [
      {
        id: "P-046",
        type: "RRSP",
        accountNumber: "RRSP-556688",
        marketValue: 200000.00,
        costBasis: 185000.00,
        totalGainLoss: 15000.00,
        totalGainLossPercent: 8.11,
        planCategory: "Individual Plan",
        accountHolder: "Moore, Stephanie",
        riskLevel: "Medium",
        objective: "Retirement",
        holdings: [
          {
            symbol: "VFV.TO",
            name: "Vanguard S&P 500 Index ETF",
            shares: 1500,
            price: 98.50,
            marketValue: 147750.00,
            costBasis: 135000.00,
            gainLoss: 12750.00,
            gainLossPercent: 9.44,
            assetClass: "Equity",
            sector: "Diversified",
          },
          {
            symbol: "XIC.TO",
            name: "iShares Core S&P/TSX Capped Composite Index ETF",
            shares: 1625,
            price: 32.15,
            marketValue: 52243.75,
            costBasis: 50000.00,
            gainLoss: 2243.75,
            gainLossPercent: 4.49,
            assetClass: "Equity",
            sector: "Canadian Equity",
          },
        ],
      },
      {
        id: "P-047",
        type: "TFSA",
        accountNumber: "TFSA-556688",
        marketValue: 112450.00,
        costBasis: 105000.00,
        totalGainLoss: 7450.00,
        totalGainLossPercent: 7.10,
        planCategory: "Individual Plan",
        accountHolder: "Moore, Stephanie",
        riskLevel: "Medium",
        objective: "Growth",
        holdings: [
          {
            symbol: "XAW.TO",
            name: "iShares Core MSCI All Country World ex Canada Index ETF",
            shares: 1425,
            price: 78.90,
            marketValue: 112432.50,
            costBasis: 105000.00,
            gainLoss: 7432.50,
            gainLossPercent: 7.08,
            assetClass: "Equity",
            sector: "International Equity",
          },
          {
            symbol: "VFV.TO",
            name: "Vanguard S&P 500 Index ETF",
            shares: 0,
            price: 98.50,
            marketValue: 0.00,
            costBasis: 0.00,
            gainLoss: 0.00,
            gainLossPercent: 0.00,
            assetClass: "Equity",
            sector: "Diversified",
          },
        ],
      },
    ],
    recentActivity: [
      { label: "Rebalance completed", timestamp: "Nov 7 • 11:00 AM" },
      { label: "Annual contribution • $6,000", timestamp: "Nov 4 • 10:15 AM" },
    ],
  },
  {
    id: "CL-026",
    name: "Jason Davis",
    accountNumber: "A-667799",
    email: "jason.davis@clientmail.com",
    phone: "(416) 555-6677",
    status: "Active",
    documents: "Uploaded",
    assets: "$223,890.00",
    plans: [
      {
        id: "P-048",
        type: "RRSP",
        accountNumber: "RRSP-667799",
        marketValue: 150000.00,
        costBasis: 140000.00,
        totalGainLoss: 10000.00,
        totalGainLossPercent: 7.14,
        planCategory: "Individual Plan",
        accountHolder: "Davis, Jason",
        riskLevel: "Medium",
        objective: "Retirement",
        holdings: [
          {
            symbol: "VFV.TO",
            name: "Vanguard S&P 500 Index ETF",
            shares: 1200,
            price: 98.50,
            marketValue: 118200.00,
            costBasis: 110000.00,
            gainLoss: 8200.00,
            gainLossPercent: 7.45,
            assetClass: "Equity",
            sector: "Diversified",
          },
          {
            symbol: "XIC.TO",
            name: "iShares Core S&P/TSX Capped Composite Index ETF",
            shares: 990,
            price: 32.15,
            marketValue: 31828.50,
            costBasis: 30000.00,
            gainLoss: 1828.50,
            gainLossPercent: 6.10,
            assetClass: "Equity",
            sector: "Canadian Equity",
          },
        ],
      },
      {
        id: "P-049",
        type: "Non-Registered",
        accountNumber: "NR-667799",
        marketValue: 73890.00,
        costBasis: 70000.00,
        totalGainLoss: 3890.00,
        totalGainLossPercent: 5.56,
        planCategory: "Individual Plan",
        accountHolder: "Davis, Jason",
        riskLevel: "Medium",
        objective: "Growth",
        holdings: [
          {
            symbol: "MSFT",
            name: "Microsoft Corporation",
            shares: 190,
            price: 380.25,
            marketValue: 72247.50,
            costBasis: 70000.00,
            gainLoss: 2247.50,
            gainLossPercent: 3.21,
            assetClass: "Equity",
            sector: "Technology",
          },
          {
            symbol: "AAPL",
            name: "Apple Inc.",
            shares: 9,
            price: 175.50,
            marketValue: 1579.50,
            costBasis: 0.00,
            gainLoss: 1579.50,
            gainLossPercent: 0.00,
            assetClass: "Equity",
            sector: "Technology",
          },
        ],
      },
    ],
    recentActivity: [
      { label: "Stock purchase • $10,000", timestamp: "Nov 6 • 2:30 PM" },
      { label: "Dividend payment received", timestamp: "Nov 4 • 12:00 PM" },
    ],
  },
  {
    id: "CL-027",
    name: "Lauren Martinez",
    accountNumber: "A-778800",
    email: "lauren.martinez@clientmail.com",
    phone: "(905) 555-7788",
    status: "Active",
    documents: "Uploaded",
    assets: "$198,450.00",
    plans: [
      {
        id: "P-050",
        type: "RESP",
        accountNumber: "RESP-778800",
        marketValue: 198450.00,
        costBasis: 180000.00,
        totalGainLoss: 18450.00,
        totalGainLossPercent: 10.25,
        planCategory: "Family Plan",
        accountHolder: "Martinez, Lauren",
        riskLevel: "Medium",
        objective: "Education",
        holdings: [
          {
            symbol: "VFV.TO",
            name: "Vanguard S&P 500 Index ETF",
            shares: 1500,
            price: 98.50,
            marketValue: 147750.00,
            costBasis: 135000.00,
            gainLoss: 12750.00,
            gainLossPercent: 9.44,
            assetClass: "Equity",
            sector: "Diversified",
          },
          {
            symbol: "XIC.TO",
            name: "iShares Core S&P/TSX Capped Composite Index ETF",
            shares: 1575,
            price: 32.15,
            marketValue: 50636.25,
            costBasis: 45000.00,
            gainLoss: 5636.25,
            gainLossPercent: 12.53,
            assetClass: "Equity",
            sector: "Canadian Equity",
          },
        ],
      },
    ],
    recentActivity: [
      { label: "Government grant • $500", timestamp: "Nov 6 • 9:00 AM" },
      { label: "Contribution posted • $2,500", timestamp: "Nov 4 • 11:30 AM" },
    ],
  },
  {
    id: "CL-028",
    name: "Eric Johnson",
    accountNumber: "A-889911",
    email: "eric.johnson@clientmail.com",
    phone: "(647) 555-8899",
    status: "Prospect",
    documents: "Required",
    assets: "$12,500.00",
    plans: [
      {
        id: "P-051",
        type: "TFSA",
        accountNumber: "TFSA-889911",
        marketValue: 12500.00,
        costBasis: 12000.00,
        totalGainLoss: 500.00,
        totalGainLossPercent: 4.17,
        planCategory: "Individual Plan",
        accountHolder: "Johnson, Eric",
        riskLevel: "Medium",
        objective: "Growth",
        holdings: [
          {
            symbol: "XIC.TO",
            name: "iShares Core S&P/TSX Capped Composite Index ETF",
            shares: 389,
            price: 32.15,
            marketValue: 12506.35,
            costBasis: 12000.00,
            gainLoss: 506.35,
            gainLossPercent: 4.22,
            assetClass: "Equity",
            sector: "Canadian Equity",
          },
          {
            symbol: "VFV.TO",
            name: "Vanguard S&P 500 Index ETF",
            shares: 0,
            price: 98.50,
            marketValue: 0.00,
            costBasis: 0.00,
            gainLoss: 0.00,
            gainLossPercent: 0.00,
            assetClass: "Equity",
            sector: "Diversified",
          },
        ],
      },
    ],
    recentActivity: [
      { label: "Account opened", timestamp: "Nov 7 • 2:00 PM" },
      { label: "Initial deposit • $12,000", timestamp: "Nov 7 • 2:00 PM" },
    ],
  },
  {
    id: "CL-029",
    name: "Amanda Jackson",
    accountNumber: "A-990022",
    email: "amanda.jackson@clientmail.com",
    phone: "(519) 555-9900",
    status: "Active",
    documents: "Uploaded",
    assets: "$456,780.00",
    plans: [
      {
        id: "P-052",
        type: "RRSP",
        accountNumber: "RRSP-990022",
        marketValue: 300000.00,
        costBasis: 280000.00,
        totalGainLoss: 20000.00,
        totalGainLossPercent: 7.14,
        planCategory: "Individual Plan",
        accountHolder: "Jackson, Amanda",
        riskLevel: "Medium",
        objective: "Retirement",
        holdings: [
          {
            symbol: "VFV.TO",
            name: "Vanguard S&P 500 Index ETF",
            shares: 2500,
            price: 98.50,
            marketValue: 246250.00,
            costBasis: 230000.00,
            gainLoss: 16250.00,
            gainLossPercent: 7.07,
            assetClass: "Equity",
            sector: "Diversified",
          },
          {
            symbol: "VAB.TO",
            name: "Vanguard Canadian Aggregate Bond Index ETF",
            shares: 1980,
            price: 27.15,
            marketValue: 53757.00,
            costBasis: 50000.00,
            gainLoss: 3757.00,
            gainLossPercent: 7.51,
            assetClass: "Fixed Income",
            sector: "Bonds",
          },
        ],
      },
      {
        id: "P-053",
        type: "RRIF",
        accountNumber: "RRIF-990022",
        marketValue: 156780.00,
        costBasis: 150000.00,
        totalGainLoss: 6780.00,
        totalGainLossPercent: 4.52,
        planCategory: "Individual Plan",
        accountHolder: "Jackson, Amanda",
        riskLevel: "Conservative",
        objective: "Income",
        holdings: [
          {
            symbol: "VAB.TO",
            name: "Vanguard Canadian Aggregate Bond Index ETF",
            shares: 5775,
            price: 27.15,
            marketValue: 156791.25,
            costBasis: 150000.00,
            gainLoss: 6791.25,
            gainLossPercent: 4.53,
            assetClass: "Fixed Income",
            sector: "Bonds",
          },
          {
            symbol: "ZAG.TO",
            name: "BMO Aggregate Bond Index ETF",
            shares: 0,
            price: 15.82,
            marketValue: 0.00,
            costBasis: 0.00,
            gainLoss: 0.00,
            gainLossPercent: 0.00,
            assetClass: "Fixed Income",
            sector: "Bonds",
          },
        ],
      },
    ],
    recentActivity: [
      { label: "RRIF withdrawal • $3,000", timestamp: "Nov 7 • 10:00 AM" },
      { label: "Annual review completed", timestamp: "Nov 5 • 3:00 PM" },
    ],
  },
  {
    id: "CL-030",
    name: "Matthew Harris",
    accountNumber: "A-001133",
    email: "matthew.harris@clientmail.com",
    phone: "(613) 555-0011",
    status: "Active",
    documents: "Uploaded",
    assets: "$334,560.00",
    plans: [
      {
        id: "P-054",
        type: "RRSP",
        accountNumber: "RRSP-001133",
        marketValue: 200000.00,
        costBasis: 185000.00,
        totalGainLoss: 15000.00,
        totalGainLossPercent: 8.11,
        planCategory: "Individual Plan",
        accountHolder: "Harris, Matthew",
        riskLevel: "Medium",
        objective: "Retirement",
        holdings: [
          {
            symbol: "VFV.TO",
            name: "Vanguard S&P 500 Index ETF",
            shares: 1500,
            price: 98.50,
            marketValue: 147750.00,
            costBasis: 135000.00,
            gainLoss: 12750.00,
            gainLossPercent: 9.44,
            assetClass: "Equity",
            sector: "Diversified",
          },
          {
            symbol: "XIC.TO",
            name: "iShares Core S&P/TSX Capped Composite Index ETF",
            shares: 1625,
            price: 32.15,
            marketValue: 52243.75,
            costBasis: 50000.00,
            gainLoss: 2243.75,
            gainLossPercent: 4.49,
            assetClass: "Equity",
            sector: "Canadian Equity",
          },
        ],
      },
      {
        id: "P-055",
        type: "Non-Registered",
        accountNumber: "NR-001133",
        marketValue: 134560.00,
        costBasis: 125000.00,
        totalGainLoss: 9560.00,
        totalGainLossPercent: 7.65,
        planCategory: "Individual Plan",
        accountHolder: "Harris, Matthew",
        riskLevel: "Medium",
        objective: "Growth",
        holdings: [
          {
            symbol: "AAPL",
            name: "Apple Inc.",
            shares: 500,
            price: 175.50,
            marketValue: 87750.00,
            costBasis: 80000.00,
            gainLoss: 7750.00,
            gainLossPercent: 9.69,
            assetClass: "Equity",
            sector: "Technology",
          },
          {
            symbol: "GOOGL",
            name: "Alphabet Inc.",
            shares: 320,
            price: 145.30,
            marketValue: 46496.00,
            costBasis: 45000.00,
            gainLoss: 1496.00,
            gainLossPercent: 3.32,
            assetClass: "Equity",
            sector: "Technology",
          },
        ],
      },
    ],
    recentActivity: [
      { label: "Stock purchase • $15,000", timestamp: "Nov 6 • 1:00 PM" },
      { label: "Portfolio rebalance", timestamp: "Nov 4 • 10:30 AM" },
    ],
  },
  {
    id: "CL-031",
    name: "Olivia Clark",
    accountNumber: "A-112255",
    email: "olivia.clark@clientmail.com",
    phone: "(416) 555-1122",
    status: "Active",
    documents: "Uploaded",
    assets: "$178,920.00",
    plans: [
      {
        id: "P-056",
        type: "TFSA",
        accountNumber: "TFSA-112255",
        marketValue: 95000.00,
        costBasis: 87500.00,
        totalGainLoss: 7500.00,
        totalGainLossPercent: 8.57,
        planCategory: "Individual Plan",
        accountHolder: "Clark, Olivia",
        riskLevel: "Medium",
        objective: "Growth",
        holdings: [
          {
            symbol: "XAW.TO",
            name: "iShares Core MSCI All Country World ex Canada Index ETF",
            shares: 1200,
            price: 78.90,
            marketValue: 94680.00,
            costBasis: 87500.00,
            gainLoss: 7180.00,
            gainLossPercent: 8.21,
            assetClass: "Equity",
            sector: "International Equity",
          },
          {
            symbol: "VFV.TO",
            name: "Vanguard S&P 500 Index ETF",
            shares: 3,
            price: 98.50,
            marketValue: 295.50,
            costBasis: 0.00,
            gainLoss: 295.50,
            gainLossPercent: 0.00,
            assetClass: "Equity",
            sector: "Diversified",
          },
        ],
      },
      {
        id: "P-057",
        type: "RRSP",
        accountNumber: "RRSP-112255",
        marketValue: 83920.00,
        costBasis: 80000.00,
        totalGainLoss: 3920.00,
        totalGainLossPercent: 4.90,
        planCategory: "Individual Plan",
        accountHolder: "Clark, Olivia",
        riskLevel: "Medium",
        objective: "Retirement",
        holdings: [
          {
            symbol: "VFV.TO",
            name: "Vanguard S&P 500 Index ETF",
            shares: 600,
            price: 98.50,
            marketValue: 59100.00,
            costBasis: 55000.00,
            gainLoss: 4100.00,
            gainLossPercent: 7.45,
            assetClass: "Equity",
            sector: "Diversified",
          },
          {
            symbol: "ZAG.TO",
            name: "BMO Aggregate Bond Index ETF",
            shares: 1570,
            price: 15.82,
            marketValue: 24837.40,
            costBasis: 25000.00,
            gainLoss: -162.60,
            gainLossPercent: -0.65,
            assetClass: "Fixed Income",
            sector: "Bonds",
          },
        ],
      },
    ],
    recentActivity: [
      { label: "Monthly contribution • $500", timestamp: "Nov 7 • 8:00 AM" },
      { label: "Account statement generated", timestamp: "Nov 5 • 3:00 PM" },
    ],
  },
  {
    id: "CL-032",
    name: "Nathan Lewis",
    accountNumber: "A-223366",
    email: "nathan.lewis@clientmail.com",
    phone: "(905) 555-2233",
    status: "Active",
    documents: "Uploaded",
    assets: "$267,450.00",
    plans: [
      {
        id: "P-058",
        type: "RRSP",
        accountNumber: "RRSP-223366",
        marketValue: 200000.00,
        costBasis: 185000.00,
        totalGainLoss: 15000.00,
        totalGainLossPercent: 8.11,
        planCategory: "Individual Plan",
        accountHolder: "Lewis, Nathan",
        riskLevel: "Medium",
        objective: "Retirement",
        holdings: [
          {
            symbol: "VFV.TO",
            name: "Vanguard S&P 500 Index ETF",
            shares: 1500,
            price: 98.50,
            marketValue: 147750.00,
            costBasis: 135000.00,
            gainLoss: 12750.00,
            gainLossPercent: 9.44,
            assetClass: "Equity",
            sector: "Diversified",
          },
          {
            symbol: "XIC.TO",
            name: "iShares Core S&P/TSX Capped Composite Index ETF",
            shares: 1625,
            price: 32.15,
            marketValue: 52243.75,
            costBasis: 50000.00,
            gainLoss: 2243.75,
            gainLossPercent: 4.49,
            assetClass: "Equity",
            sector: "Canadian Equity",
          },
        ],
      },
      {
        id: "P-059",
        type: "Non-Registered",
        accountNumber: "NR-223366",
        marketValue: 67450.00,
        costBasis: 65000.00,
        totalGainLoss: 2450.00,
        totalGainLossPercent: 3.77,
        planCategory: "Individual Plan",
        accountHolder: "Lewis, Nathan",
        riskLevel: "Medium",
        objective: "Growth",
        holdings: [
          {
            symbol: "MSFT",
            name: "Microsoft Corporation",
            shares: 175,
            price: 380.25,
            marketValue: 66543.75,
            costBasis: 65000.00,
            gainLoss: 1543.75,
            gainLossPercent: 2.38,
            assetClass: "Equity",
            sector: "Technology",
          },
          {
            symbol: "AAPL",
            name: "Apple Inc.",
            shares: 5,
            price: 175.50,
            marketValue: 877.50,
            costBasis: 0.00,
            gainLoss: 877.50,
            gainLossPercent: 0.00,
            assetClass: "Equity",
            sector: "Technology",
          },
        ],
      },
    ],
    recentActivity: [
      { label: "Stock purchase • $12,000", timestamp: "Nov 6 • 11:30 AM" },
      { label: "Dividend received • $350", timestamp: "Nov 4 • 2:00 PM" },
    ],
  },
  {
    id: "CL-033",
    name: "Sophia Walker",
    accountNumber: "A-334477",
    email: "sophia.walker@clientmail.com",
    phone: "(647) 555-3344",
    status: "Active",
    documents: "Uploaded",
    assets: "$145,230.00",
    plans: [
      {
        id: "P-060",
        type: "RESP",
        accountNumber: "RESP-334477",
        marketValue: 145230.00,
        costBasis: 130000.00,
        totalGainLoss: 15230.00,
        totalGainLossPercent: 11.72,
        planCategory: "Family Plan",
        accountHolder: "Walker, Sophia",
        riskLevel: "Medium",
        objective: "Education",
        holdings: [
          {
            symbol: "VFV.TO",
            name: "Vanguard S&P 500 Index ETF",
            shares: 1200,
            price: 98.50,
            marketValue: 118200.00,
            costBasis: 105000.00,
            gainLoss: 13200.00,
            gainLossPercent: 12.57,
            assetClass: "Equity",
            sector: "Diversified",
          },
          {
            symbol: "XIC.TO",
            name: "iShares Core S&P/TSX Capped Composite Index ETF",
            shares: 840,
            price: 32.15,
            marketValue: 27006.00,
            costBasis: 25000.00,
            gainLoss: 2006.00,
            gainLossPercent: 8.02,
            assetClass: "Equity",
            sector: "Canadian Equity",
          },
        ],
      },
    ],
    recentActivity: [
      { label: "Contribution posted • $2,500", timestamp: "Nov 6 • 9:00 AM" },
      { label: "Government grant received", timestamp: "Nov 4 • 8:30 AM" },
    ],
  },
  {
    id: "CL-034",
    name: "Benjamin Hall",
    accountNumber: "A-445588",
    email: "benjamin.hall@clientmail.com",
    phone: "(519) 555-4455",
    status: "Active",
    documents: "Uploaded",
    assets: "$412,340.00",
    plans: [
      {
        id: "P-061",
        type: "RRSP",
        accountNumber: "RRSP-445588",
        marketValue: 250000.00,
        costBasis: 230000.00,
        totalGainLoss: 20000.00,
        totalGainLossPercent: 8.70,
        planCategory: "Individual Plan",
        accountHolder: "Hall, Benjamin",
        riskLevel: "Medium",
        objective: "Retirement",
        holdings: [
          {
            symbol: "VFV.TO",
            name: "Vanguard S&P 500 Index ETF",
            shares: 2000,
            price: 98.50,
            marketValue: 197000.00,
            costBasis: 180000.00,
            gainLoss: 17000.00,
            gainLossPercent: 9.44,
            assetClass: "Equity",
            sector: "Diversified",
          },
          {
            symbol: "XIC.TO",
            name: "iShares Core S&P/TSX Capped Composite Index ETF",
            shares: 1650,
            price: 32.15,
            marketValue: 53047.50,
            costBasis: 50000.00,
            gainLoss: 3047.50,
            gainLossPercent: 6.10,
            assetClass: "Equity",
            sector: "Canadian Equity",
          },
        ],
      },
      {
        id: "P-062",
        type: "LIRA",
        accountNumber: "LIRA-445588",
        marketValue: 162340.00,
        costBasis: 155000.00,
        totalGainLoss: 7340.00,
        totalGainLossPercent: 4.74,
        planCategory: "Individual Plan",
        accountHolder: "Hall, Benjamin",
        riskLevel: "Conservative",
        objective: "Preservation",
        holdings: [
          {
            symbol: "VAB.TO",
            name: "Vanguard Canadian Aggregate Bond Index ETF",
            shares: 5983,
            price: 27.15,
            marketValue: 162388.45,
            costBasis: 155000.00,
            gainLoss: 7388.45,
            gainLossPercent: 4.77,
            assetClass: "Fixed Income",
            sector: "Bonds",
          },
          {
            symbol: "ZAG.TO",
            name: "BMO Aggregate Bond Index ETF",
            shares: 0,
            price: 15.82,
            marketValue: 0.00,
            costBasis: 0.00,
            gainLoss: 0.00,
            gainLossPercent: 0.00,
            assetClass: "Fixed Income",
            sector: "Bonds",
          },
        ],
      },
    ],
    recentActivity: [
      { label: "LIRA transfer completed", timestamp: "Nov 6 • 10:00 AM" },
      { label: "Annual review scheduled", timestamp: "Nov 5 • 2:00 PM" },
    ],
  },
  {
    id: "CL-035",
    name: "Emma Young",
    accountNumber: "A-556699",
    email: "emma.young@clientmail.com",
    phone: "(613) 555-5566",
    status: "Active",
    documents: "Uploaded",
    assets: "$223,670.00",
    plans: [
      {
        id: "P-063",
        type: "TFSA",
        accountNumber: "TFSA-556699",
        marketValue: 95000.00,
        costBasis: 87500.00,
        totalGainLoss: 7500.00,
        totalGainLossPercent: 8.57,
        planCategory: "Individual Plan",
        accountHolder: "Young, Emma",
        riskLevel: "Medium",
        objective: "Growth",
        holdings: [
          {
            symbol: "XAW.TO",
            name: "iShares Core MSCI All Country World ex Canada Index ETF",
            shares: 1200,
            price: 78.90,
            marketValue: 94680.00,
            costBasis: 87500.00,
            gainLoss: 7180.00,
            gainLossPercent: 8.21,
            assetClass: "Equity",
            sector: "International Equity",
          },
          {
            symbol: "VFV.TO",
            name: "Vanguard S&P 500 Index ETF",
            shares: 3,
            price: 98.50,
            marketValue: 295.50,
            costBasis: 0.00,
            gainLoss: 295.50,
            gainLossPercent: 0.00,
            assetClass: "Equity",
            sector: "Diversified",
          },
        ],
      },
      {
        id: "P-064",
        type: "RRSP",
        accountNumber: "RRSP-556699",
        marketValue: 128670.00,
        costBasis: 120000.00,
        totalGainLoss: 8670.00,
        totalGainLossPercent: 7.23,
        planCategory: "Individual Plan",
        accountHolder: "Young, Emma",
        riskLevel: "Medium",
        objective: "Retirement",
        holdings: [
          {
            symbol: "VFV.TO",
            name: "Vanguard S&P 500 Index ETF",
            shares: 1000,
            price: 98.50,
            marketValue: 98500.00,
            costBasis: 90000.00,
            gainLoss: 8500.00,
            gainLossPercent: 9.44,
            assetClass: "Equity",
            sector: "Diversified",
          },
          {
            symbol: "XIC.TO",
            name: "iShares Core S&P/TSX Capped Composite Index ETF",
            shares: 940,
            price: 32.15,
            marketValue: 30221.00,
            costBasis: 30000.00,
            gainLoss: 221.00,
            gainLossPercent: 0.74,
            assetClass: "Equity",
            sector: "Canadian Equity",
          },
        ],
      },
    ],
    recentActivity: [
      { label: "Monthly contribution • $500", timestamp: "Nov 7 • 8:00 AM" },
      { label: "Portfolio review completed", timestamp: "Nov 5 • 11:00 AM" },
    ],
  },
  {
    id: "CL-036",
    name: "Alexander King",
    accountNumber: "A-667700",
    email: "alexander.king@clientmail.com",
    phone: "(416) 555-6677",
    status: "Active",
    documents: "Uploaded",
    assets: "$389,120.00",
    plans: [
      {
        id: "P-065",
        type: "RRSP",
        accountNumber: "RRSP-667700",
        marketValue: 250000.00,
        costBasis: 230000.00,
        totalGainLoss: 20000.00,
        totalGainLossPercent: 8.70,
        planCategory: "Individual Plan",
        accountHolder: "King, Alexander",
        riskLevel: "Medium",
        objective: "Retirement",
        holdings: [
          {
            symbol: "VFV.TO",
            name: "Vanguard S&P 500 Index ETF",
            shares: 2000,
            price: 98.50,
            marketValue: 197000.00,
            costBasis: 180000.00,
            gainLoss: 17000.00,
            gainLossPercent: 9.44,
            assetClass: "Equity",
            sector: "Diversified",
          },
          {
            symbol: "XIC.TO",
            name: "iShares Core S&P/TSX Capped Composite Index ETF",
            shares: 1650,
            price: 32.15,
            marketValue: 53047.50,
            costBasis: 50000.00,
            gainLoss: 3047.50,
            gainLossPercent: 6.10,
            assetClass: "Equity",
            sector: "Canadian Equity",
          },
        ],
      },
      {
        id: "P-066",
        type: "Non-Registered",
        accountNumber: "NR-667700",
        marketValue: 139120.00,
        costBasis: 130000.00,
        totalGainLoss: 9120.00,
        totalGainLossPercent: 7.02,
        planCategory: "Individual Plan",
        accountHolder: "King, Alexander",
        riskLevel: "Medium",
        objective: "Growth",
        holdings: [
          {
            symbol: "AAPL",
            name: "Apple Inc.",
            shares: 500,
            price: 175.50,
            marketValue: 87750.00,
            costBasis: 80000.00,
            gainLoss: 7750.00,
            gainLossPercent: 9.69,
            assetClass: "Equity",
            sector: "Technology",
          },
          {
            symbol: "GOOGL",
            name: "Alphabet Inc.",
            shares: 350,
            price: 145.30,
            marketValue: 50855.00,
            costBasis: 50000.00,
            gainLoss: 855.00,
            gainLossPercent: 1.71,
            assetClass: "Equity",
            sector: "Technology",
          },
        ],
      },
    ],
    recentActivity: [
      { label: "Stock purchase • $18,000", timestamp: "Nov 6 • 1:15 PM" },
      { label: "Dividend reinvestment", timestamp: "Nov 4 • 9:30 AM" },
    ],
  },
  {
    id: "CL-037",
    name: "Isabella Wright",
    accountNumber: "A-778811",
    email: "isabella.wright@clientmail.com",
    phone: "(905) 555-7788",
    status: "Active",
    documents: "Uploaded",
    assets: "$156,890.00",
    plans: [
      {
        id: "P-067",
        type: "TFSA",
        accountNumber: "TFSA-778811",
        marketValue: 95000.00,
        costBasis: 87500.00,
        totalGainLoss: 7500.00,
        totalGainLossPercent: 8.57,
        planCategory: "Individual Plan",
        accountHolder: "Wright, Isabella",
        riskLevel: "Medium",
        objective: "Growth",
        holdings: [
          {
            symbol: "XAW.TO",
            name: "iShares Core MSCI All Country World ex Canada Index ETF",
            shares: 1200,
            price: 78.90,
            marketValue: 94680.00,
            costBasis: 87500.00,
            gainLoss: 7180.00,
            gainLossPercent: 8.21,
            assetClass: "Equity",
            sector: "International Equity",
          },
          {
            symbol: "VFV.TO",
            name: "Vanguard S&P 500 Index ETF",
            shares: 3,
            price: 98.50,
            marketValue: 295.50,
            costBasis: 0.00,
            gainLoss: 295.50,
            gainLossPercent: 0.00,
            assetClass: "Equity",
            sector: "Diversified",
          },
        ],
      },
      {
        id: "P-068",
        type: "RRSP",
        accountNumber: "RRSP-778811",
        marketValue: 61890.00,
        costBasis: 60000.00,
        totalGainLoss: 1890.00,
        totalGainLossPercent: 3.15,
        planCategory: "Individual Plan",
        accountHolder: "Wright, Isabella",
        riskLevel: "Medium",
        objective: "Retirement",
        holdings: [
          {
            symbol: "VFV.TO",
            name: "Vanguard S&P 500 Index ETF",
            shares: 500,
            price: 98.50,
            marketValue: 49250.00,
            costBasis: 45000.00,
            gainLoss: 4250.00,
            gainLossPercent: 9.44,
            assetClass: "Equity",
            sector: "Diversified",
          },
          {
            symbol: "ZAG.TO",
            name: "BMO Aggregate Bond Index ETF",
            shares: 800,
            price: 15.82,
            marketValue: 12656.00,
            costBasis: 15000.00,
            gainLoss: -2344.00,
            gainLossPercent: -15.63,
            assetClass: "Fixed Income",
            sector: "Bonds",
          },
        ],
      },
    ],
    recentActivity: [
      { label: "Monthly contribution • $500", timestamp: "Nov 7 • 8:00 AM" },
      { label: "Account statement generated", timestamp: "Nov 5 • 3:00 PM" },
    ],
  },
  {
    id: "CL-038",
    name: "Daniel Lopez",
    accountNumber: "A-889922",
    email: "daniel.lopez@clientmail.com",
    phone: "(647) 555-8899",
    status: "Active",
    documents: "Uploaded",
    assets: "$278,450.00",
    plans: [
      {
        id: "P-069",
        type: "RRSP",
        accountNumber: "RRSP-889922",
        marketValue: 200000.00,
        costBasis: 185000.00,
        totalGainLoss: 15000.00,
        totalGainLossPercent: 8.11,
        planCategory: "Individual Plan",
        accountHolder: "Lopez, Daniel",
        riskLevel: "Medium",
        objective: "Retirement",
        holdings: [
          {
            symbol: "VFV.TO",
            name: "Vanguard S&P 500 Index ETF",
            shares: 1500,
            price: 98.50,
            marketValue: 147750.00,
            costBasis: 135000.00,
            gainLoss: 12750.00,
            gainLossPercent: 9.44,
            assetClass: "Equity",
            sector: "Diversified",
          },
          {
            symbol: "XIC.TO",
            name: "iShares Core S&P/TSX Capped Composite Index ETF",
            shares: 1625,
            price: 32.15,
            marketValue: 52243.75,
            costBasis: 50000.00,
            gainLoss: 2243.75,
            gainLossPercent: 4.49,
            assetClass: "Equity",
            sector: "Canadian Equity",
          },
        ],
      },
      {
        id: "P-070",
        type: "Non-Registered",
        accountNumber: "NR-889922",
        marketValue: 78450.00,
        costBasis: 75000.00,
        totalGainLoss: 3450.00,
        totalGainLossPercent: 4.60,
        planCategory: "Individual Plan",
        accountHolder: "Lopez, Daniel",
        riskLevel: "Medium",
        objective: "Growth",
        holdings: [
          {
            symbol: "MSFT",
            name: "Microsoft Corporation",
            shares: 200,
            price: 380.25,
            marketValue: 76050.00,
            costBasis: 75000.00,
            gainLoss: 1050.00,
            gainLossPercent: 1.40,
            assetClass: "Equity",
            sector: "Technology",
          },
          {
            symbol: "AAPL",
            name: "Apple Inc.",
            shares: 14,
            price: 175.50,
            marketValue: 2457.00,
            costBasis: 0.00,
            gainLoss: 2457.00,
            gainLossPercent: 0.00,
            assetClass: "Equity",
            sector: "Technology",
          },
        ],
      },
    ],
    recentActivity: [
      { label: "Stock purchase • $10,000", timestamp: "Nov 6 • 2:00 PM" },
      { label: "Dividend payment received", timestamp: "Nov 4 • 12:00 PM" },
    ],
  },
  {
    id: "CL-039",
    name: "Grace Hill",
    accountNumber: "A-990033",
    email: "grace.hill@clientmail.com",
    phone: "(519) 555-9900",
    status: "Active",
    documents: "Uploaded",
    assets: "$201,340.00",
    plans: [
      {
        id: "P-071",
        type: "RESP",
        accountNumber: "RESP-990033",
        marketValue: 201340.00,
        costBasis: 180000.00,
        totalGainLoss: 21340.00,
        totalGainLossPercent: 11.86,
        planCategory: "Family Plan",
        accountHolder: "Hill, Grace",
        riskLevel: "Medium",
        objective: "Education",
        holdings: [
          {
            symbol: "VFV.TO",
            name: "Vanguard S&P 500 Index ETF",
            shares: 1500,
            price: 98.50,
            marketValue: 147750.00,
            costBasis: 135000.00,
            gainLoss: 12750.00,
            gainLossPercent: 9.44,
            assetClass: "Equity",
            sector: "Diversified",
          },
          {
            symbol: "XIC.TO",
            name: "iShares Core S&P/TSX Capped Composite Index ETF",
            shares: 1665,
            price: 32.15,
            marketValue: 53529.75,
            costBasis: 45000.00,
            gainLoss: 8529.75,
            gainLossPercent: 18.93,
            assetClass: "Equity",
            sector: "Canadian Equity",
          },
        ],
      },
    ],
    recentActivity: [
      { label: "Contribution posted • $2,500", timestamp: "Nov 6 • 9:00 AM" },
      { label: "Government grant received", timestamp: "Nov 4 • 8:30 AM" },
    ],
  },
  {
    id: "CL-040",
    name: "William Scott",
    accountNumber: "A-001144",
    email: "william.scott@clientmail.com",
    phone: "(613) 555-0011",
    status: "Active",
    documents: "Uploaded",
    assets: "$445,670.00",
    plans: [
      {
        id: "P-072",
        type: "RRSP",
        accountNumber: "RRSP-001144",
        marketValue: 300000.00,
        costBasis: 280000.00,
        totalGainLoss: 20000.00,
        totalGainLossPercent: 7.14,
        planCategory: "Individual Plan",
        accountHolder: "Scott, William",
        riskLevel: "Medium",
        objective: "Retirement",
        holdings: [
          {
            symbol: "VFV.TO",
            name: "Vanguard S&P 500 Index ETF",
            shares: 2500,
            price: 98.50,
            marketValue: 246250.00,
            costBasis: 230000.00,
            gainLoss: 16250.00,
            gainLossPercent: 7.07,
            assetClass: "Equity",
            sector: "Diversified",
          },
          {
            symbol: "VAB.TO",
            name: "Vanguard Canadian Aggregate Bond Index ETF",
            shares: 1980,
            price: 27.15,
            marketValue: 53757.00,
            costBasis: 50000.00,
            gainLoss: 3757.00,
            gainLossPercent: 7.51,
            assetClass: "Fixed Income",
            sector: "Bonds",
          },
        ],
      },
      {
        id: "P-073",
        type: "RRIF",
        accountNumber: "RRIF-001144",
        marketValue: 145670.00,
        costBasis: 140000.00,
        totalGainLoss: 5670.00,
        totalGainLossPercent: 4.05,
        planCategory: "Individual Plan",
        accountHolder: "Scott, William",
        riskLevel: "Conservative",
        objective: "Income",
        holdings: [
          {
            symbol: "VAB.TO",
            name: "Vanguard Canadian Aggregate Bond Index ETF",
            shares: 5367,
            price: 27.15,
            marketValue: 145663.05,
            costBasis: 140000.00,
            gainLoss: 5663.05,
            gainLossPercent: 4.05,
            assetClass: "Fixed Income",
            sector: "Bonds",
          },
          {
            symbol: "ZAG.TO",
            name: "BMO Aggregate Bond Index ETF",
            shares: 0,
            price: 15.82,
            marketValue: 0.00,
            costBasis: 0.00,
            gainLoss: 0.00,
            gainLossPercent: 0.00,
            assetClass: "Fixed Income",
            sector: "Bonds",
          },
        ],
      },
    ],
    recentActivity: [
      { label: "RRIF withdrawal • $2,500", timestamp: "Nov 7 • 10:00 AM" },
      { label: "Annual review completed", timestamp: "Nov 5 • 3:00 PM" },
    ],
  },
];

const statusBadgeStyles: Record<ClientStatus, string> = {
  Active: "bg-green-100 text-green-700",
  Inactive: "bg-gray-100 text-gray-700",
  Prospect: "bg-blue-100 text-blue-700",
};

const docBadgeStyles: Record<DocumentStatus, string> = {
  Uploaded: "bg-green-100 text-green-700",
  Required: "bg-yellow-100 text-yellow-700",
  Missing: "bg-red-100 text-red-700",
};

const Clients = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [clients, setClients] = useState<Client[]>(CLIENTS);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedClient, setSelectedClient] = useState<Client | null>(CLIENTS.length > 0 ? CLIENTS[0] : null);
  
  // Handle client selection from sidebar
  useEffect(() => {
    if (location.state?.selectedClientId) {
      const client = clients.find((c) => c.id === location.state.selectedClientId);
      if (client) {
        setSelectedClient(client);
      }
    }
  }, [location.state, clients]);
  const [clientViewTab, setClientViewTab] = useState<"details">("details");
  const [activeView, setActiveView] = useState<"clients" | "households">("clients");
  const [householdSearchTerm, setHouseholdSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<Record<string, boolean>>({
    "ACTIVE": false,
    "PENDING REVIEW": false,
  });
  const [showAddClient, setShowAddClient] = useState(false);
  const [expandedPlans, setExpandedPlans] = useState<Set<string>>(new Set());
  const [productDocumentsExpanded, setProductDocumentsExpanded] = useState(true);
  const [selectedDocuments, setSelectedDocuments] = useState<Set<string>>(new Set());
  const [uploadedDocuments, setUploadedDocuments] = useState<Record<string, Array<{ id: string; name: string; date: string; file?: File }>>>({});
  const [showBuyUnits, setShowBuyUnits] = useState(false);
  const [showSellUnits, setShowSellUnits] = useState(false);
  const [showOrderConfirmed, setShowOrderConfirmed] = useState(false);
  const [orderConfirmedType, setOrderConfirmedType] = useState<"buy" | "sell" | null>(null);
  const [showOrderConfirmation, setShowOrderConfirmation] = useState(false);
  const [showDepositDialog, setShowDepositDialog] = useState(false);
  const [depositAmount, setDepositAmount] = useState("0.00");
  const [showSellOrderConfirmation, setShowSellOrderConfirmation] = useState(false);
  const [showAddPlanDialog, setShowAddPlanDialog] = useState(false);
  const [showAddProductAfterPlan, setShowAddProductAfterPlan] = useState(false);
  const [showAddProductDialog, setShowAddProductDialog] = useState(false);
  const [selectedPlanForProduct, setSelectedPlanForProduct] = useState<Plan | null>(null);
  const [addProductData, setAddProductData] = useState({
    fundCompany: "",
    selectedFund: "",
    investmentAmount: "",
  });
  const [orderConfirmationSource, setOrderConfirmationSource] = useState<"after-plan" | "standalone" | null>(null);
  const [fundSearchOpen, setFundSearchOpen] = useState(false);
  const [fundSearchOpenAfterPlan, setFundSearchOpenAfterPlan] = useState(false);
  const [mapDropdownOpen, setMapDropdownOpen] = useState(false);
  const [exceptionsDropdownOpen, setExceptionsDropdownOpen] = useState(false);
  const [pendingOrderConfirmation, setPendingOrderConfirmation] = useState(false);
  const [addPlanStep, setAddPlanStep] = useState<"select-type" | 1 | 2 | 3>("select-type");
  const [selectedPlanType, setSelectedPlanType] = useState<PlanType | "">("");
  const [newPlanData, setNewPlanData] = useState({
    ownerName: "",
    beneficiaryName: "",
    intermediaryCode: "",
    intermediaryAccountCode: "",
    notes: "",
    objectives: "",
    riskTolerance: "",
    timeHorizon: "",
  });
  const [newlyCreatedPlan, setNewlyCreatedPlan] = useState<{ planType: string; planId: string; accountNumber: string; owner: string } | null>(null);
  const [selectedHolding, setSelectedHolding] = useState<{ holding: Holding; plan: Plan } | null>(null);
  const [buyOrderData, setBuyOrderData] = useState<{
    investmentAmount: string;
    units: string;
    estimatedCost: number;
    unitsToPurchase: number;
  }>({
    investmentAmount: "",
    units: "",
    estimatedCost: 0,
    unitsToPurchase: 0,
  });
  const [sellOrderData, setSellOrderData] = useState<{
    units: string;
    dollarAmount: string;
    estimatedProceeds: number;
    unitsToSell: number;
  }>({
    units: "",
    dollarAmount: "",
    estimatedProceeds: 0,
    unitsToSell: 0,
  });
  const [orderConfirmationData, setOrderConfirmationData] = useState<{
    symbol: string;
    name: string;
    units: number;
    price: number;
    totalCost: number;
  } | null>(null);
  const [sellOrderConfirmationData, setSellOrderConfirmationData] = useState<{
    symbol: string;
    name: string;
    units: number;
    price: number;
    totalProceeds: number;
  } | null>(null);
  const [showSwitchFund, setShowSwitchFund] = useState(false);
  const [showConvertFund, setShowConvertFund] = useState(false);
  const [isConvertMode, setIsConvertMode] = useState(false);
  const [showSwitchConfirmation, setShowSwitchConfirmation] = useState(false);
  const [showConvertConfirmation, setShowConvertConfirmation] = useState(false);
  const [switchData, setSwitchData] = useState<{
    units: string;
    selectedCompany: string;
    selectedFund: string;
    selectedFundSymbol?: string;
    estimatedValue: number;
  }>({
    units: "",
    selectedCompany: "",
    selectedFund: "",
    selectedFundSymbol: "",
    estimatedValue: 0,
  });
  const [convertData, setConvertData] = useState<{
    units: string;
    selectedCompany: string;
    selectedFund: string;
    selectedFundSymbol?: string;
    estimatedValue: number;
  }>({
    units: "",
    selectedCompany: "",
    selectedFund: "",
    selectedFundSymbol: "",
    estimatedValue: 0,
  });
  const [fundSearchResults, setFundSearchResults] = useState<Fund[]>([]);
  const [showFundSuggestions, setShowFundSuggestions] = useState(false);
  const [switchConfirmationData, setSwitchConfirmationData] = useState<{
    fromFund: string;
    toFund: string;
    units: number;
    estimatedValue: number;
  } | null>(null);
  const [convertConfirmationData, setConvertConfirmationData] = useState<{
    fromFund: string;
    toFund: string;
    units: number;
    estimatedValue: number;
  } | null>(null);
  const [editFormValues, setEditFormValues] = useState({
    // Personal Information
    name: "",
    accountNumber: "",
    email: "",
    phone: "",
    dateOfBirth: "",
    address: "",
    city: "",
    province: "",
    postalCode: "",
    ssnTin: "",
    passport: "",
    occupation: "",
    employmentStatus: "",
    maritalStatus: "",
    dependents: "",
    healthConsiderations: "",
    lifeStage: "",
    taxStatus: "",
    // Financial Information
    annualIncome: "",
    expectedFutureIncome: "",
    netWorth: "",
    assets: "",
    liabilities: "",
    liquidityNeeds: "",
    cashFlowPatterns: "",
    investableFunds: "",
    // Investment Objectives
    primaryObjective: "",
    timeHorizon: "",
    assetAllocation: "",
    diversificationStrategy: "",
    rebalancingRules: "",
    investmentStrategy: "",
    // Risk Tolerance
    riskProfile: "",
    riskAttitude: "",
    investmentExperience: "",
    yearsInvesting: "",
    knowledgeLevel: "",
    // Beneficiaries
    status: "Prospect" as ClientStatus,
    beneficiary: "",
    contingentBeneficiary: "",
    accountType: "",
    accountOwnership: "",
    relationshipRoles: "",
    clientType: "",
  });
  const [docFilter, setDocFilter] = useState<Record<DocumentStatus, boolean>>({
    Uploaded: false,
    Required: false,
    Missing: false,
  });
  const [formValues, setFormValues] = useState({
    name: "",
    accountNumber: "",
    email: "",
    phone: "",
    status: "Prospect" as ClientStatus,
    beneficiary: "",
  });
  const [formError, setFormError] = useState<string | null>(null);
  const [isLoading] = useState(false);

  const activeDocFilters = Object.entries(docFilter)
    .filter(([, checked]) => checked)
    .map(([status]) => status as DocumentStatus);

  const filteredClients = useMemo(() => {
    return clients.filter((client) => {
      const matchesSearch =
        !searchTerm ||
        [
          client.name,
          client.accountNumber,
          client.email,
          client.status,
          client.documents,
        ]
          .join(" ")
          .toLowerCase()
          .includes(searchTerm.toLowerCase());

      const matchesDocs =
        activeDocFilters.length === 0 ||
        activeDocFilters.includes(client.documents);

      return matchesSearch && matchesDocs;
    });
    }, [clients, searchTerm, activeDocFilters]);

  const toggleDocFilter = (status: DocumentStatus) =>
    setDocFilter((prev) => ({ ...prev, [status]: !prev[status] }));

  // Expand plans when selected client changes
  useEffect(() => {
    // Keep plans collapsed initially when client changes
    setExpandedPlans(new Set());
  }, [selectedClient]);

  // Initialize edit form values when switching to edit tab
  useEffect(() => {
    if (clientViewTab === "edit" && selectedClient) {
      setFormError(null);
      setEditFormValues({
        // Personal Information
        name: selectedClient.name,
        accountNumber: selectedClient.accountNumber,
        email: selectedClient.email,
        phone: selectedClient.phone,
        dateOfBirth: "",
        address: "",
        city: "",
        province: "",
        postalCode: "",
        ssnTin: "",
        passport: "",
        occupation: "",
        employmentStatus: "",
        maritalStatus: "",
        dependents: "",
        healthConsiderations: "",
        lifeStage: "",
        taxStatus: "",
        // Financial Information
        annualIncome: "",
        expectedFutureIncome: "",
        netWorth: "",
        assets: "",
        liabilities: "",
        liquidityNeeds: "",
        cashFlowPatterns: "",
        investableFunds: "",
        // Investment Objectives
        primaryObjective: "",
        timeHorizon: "",
        assetAllocation: "",
        diversificationStrategy: "",
        rebalancingRules: "",
        investmentStrategy: "",
        // Risk Tolerance
        riskProfile: "",
        riskAttitude: "",
        investmentExperience: "",
        yearsInvesting: "",
        knowledgeLevel: "",
        // Beneficiaries
        status: selectedClient.status,
        beneficiary: "",
        contingentBeneficiary: "",
        accountType: "",
        accountOwnership: "",
        relationshipRoles: "",
        clientType: "",
      });
    }
  }, [clientViewTab, selectedClient]);

  const handleSaveEdit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!selectedClient) return;

    if (!editFormValues.name.trim() || !editFormValues.accountNumber.trim()) {
      setFormError("Client name and account number are required.");
      return;
    }

    setClients((prev) =>
      prev.map((client) =>
        client.id === selectedClient.id
          ? {
              ...client,
              name: editFormValues.name,
              accountNumber: editFormValues.accountNumber,
              email: editFormValues.email || "Not provided",
              phone: editFormValues.phone || "Not provided",
              status: editFormValues.status,
            }
          : client
      )
    );

    // Update selected client if it's the one being edited
    if (selectedClient) {
      setSelectedClient({
        ...selectedClient,
        name: editFormValues.name,
        accountNumber: editFormValues.accountNumber,
        email: editFormValues.email || "Not provided",
        phone: editFormValues.phone || "Not provided",
        status: editFormValues.status,
      });
    }

    setClientViewTab("details");
    setFormError(null);
  };

  const togglePlan = (planId: string) => {
    setExpandedPlans(prev => {
      const newSet = new Set(prev);
      if (newSet.has(planId)) {
        newSet.delete(planId);
      } else {
        newSet.add(planId);
      }
      return newSet;
    });
  };

  // Helper function to extract company from fund name
  const getCompanyFromFundName = (fundName: string): string => {
    // First try to find in fund database
    const fund = FUND_DATABASE.find(f => 
      f.name.toUpperCase() === fundName.toUpperCase() ||
      fundName.toUpperCase().includes(f.name.toUpperCase()) ||
      f.name.toUpperCase().includes(fundName.toUpperCase())
    );
    if (fund) return fund.company;
    
    // Fallback to pattern matching
    const name = fundName.toUpperCase();
    if (name.includes("FIDELITY")) return "Fidelity";
    if (name.includes("TD")) return "TD Asset Management";
    if (name.includes("VANGUARD")) return "Vanguard";
    if (name.includes("ISHARES")) return "iShares";
    if (name.includes("BMO")) return "BMO";
    if (name.includes("RBC")) return "RBC";
    if (name.includes("CIBC")) return "CIBC";
    if (name.includes("SCOTIA")) return "Scotia";
    // Default extraction - try to get first word or common pattern
    const words = fundName.split(" ");
    return words[0] || "Unknown";
  };

  // Search funds in database
  const searchFunds = (query: string): Fund[] => {
    if (!query || query.length < 2) return [];
    const lowerQuery = query.toLowerCase();
    return FUND_DATABASE.filter(fund =>
      fund.name.toLowerCase().includes(lowerQuery) ||
      fund.symbol.toLowerCase().includes(lowerQuery) ||
      fund.company.toLowerCase().includes(lowerQuery) ||
      (fund.category && fund.category.toLowerCase().includes(lowerQuery))
    ).slice(0, 10); // Limit to 10 results
  };

  // Get company from fund search
  const getCompanyFromFundSearch = (fundName: string): string | null => {
    const fund = FUND_DATABASE.find(f => 
      f.name.toUpperCase() === fundName.toUpperCase()
    );
    return fund ? fund.company : null;
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-CA', {
      style: 'currency',
      currency: 'CAD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value);
  };

  const togglePlanExpansion = (planId: string) => {
    setExpandedPlans((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(planId)) {
        newSet.delete(planId);
      } else {
        newSet.add(planId);
      }
      return newSet;
    });
  };

  const calculateTotalHoldings = (plans: Plan[]) => {
    const totalMarketValue = plans.reduce((sum, plan) => sum + plan.marketValue, 0);
    const totalCostBasis = plans.reduce((sum, plan) => sum + plan.costBasis, 0);
    const totalGainLoss = totalMarketValue - totalCostBasis;
    const totalGainLossPercent = totalCostBasis > 0 ? (totalGainLoss / totalCostBasis) * 100 : 0;
    return { totalMarketValue, totalCostBasis, totalGainLoss, totalGainLossPercent };
  };

  const handleDeleteClient = (clientId: string) => {
    setClients((prev) => prev.filter((client) => client.id !== clientId));
    if (selectedClient?.id === clientId) {
      setSelectedClient(null);
      setShowDetails(false);
    }
  };

  const resetForm = () => {
    setFormValues({
      name: "",
      accountNumber: "",
      email: "",
      phone: "",
      status: "Prospect" as ClientStatus,
      beneficiary: "",
    });
    setFormError(null);
  };

  const handleAddClient = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!formValues.name.trim() || !formValues.accountNumber.trim()) {
      setFormError("Client name and account number are required.");
      return;
    }

    const newClient: Client = {
      id: `CL-${(clients.length + 1).toString().padStart(3, "0")}`,
      name: formValues.name,
      accountNumber: formValues.accountNumber,
      email: formValues.email || "Not provided",
      phone: formValues.phone || "Not provided",
      status: formValues.status,
      documents: "Required",
      assets: "$0.00",
      plans: [],
      recentActivity: [{ label: "Client record created", timestamp: "Just now" }],
    };

    setClients((prev) => [newClient, ...prev]);
    setShowAddClient(false);
    resetForm();
  };

  return (
    <>
      <PageLayout title="">
        <div className="space-y-6">
          <Card className="border border-gray-200 shadow-sm bg-white">
            <CardHeader>
              <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                <div className="flex items-center gap-2 flex-wrap">
                  <Button 
                    variant={activeView === "clients" ? "default" : "outline"} 
                    className="text-sm font-normal"
                    onClick={() => setActiveView("clients")}
                  >
                    Summary
                  </Button>
                  <Button 
                    variant={activeView === "households" ? "default" : "outline"} 
                    className="text-sm font-normal"
                    onClick={() => setActiveView("households")}
                  >
                    Households
                  </Button>
                  <Button 
                    variant={activeView === "income-plans" ? "default" : "outline"} 
                    className="text-sm font-normal"
                    onClick={() => setActiveView("income-plans")}
                  >
                    Income Plans
                  </Button>
                  <Button 
                    variant={activeView === "approvals" ? "default" : "outline"} 
                    className="text-sm font-normal"
                    onClick={() => setActiveView("approvals")}
                  >
                    Approvals
                  </Button>
                  <Button variant="outline" className="text-sm font-normal">
                    Reports
                  </Button>
                </div>

                <div className="flex items-center gap-2 flex-wrap">
                <Input
                    value={activeView === "households" ? householdSearchTerm : searchTerm}
                    onChange={(event) => {
                      if (activeView === "households") {
                        setHouseholdSearchTerm(event.target.value);
                      } else {
                        setSearchTerm(event.target.value);
                      }
                    }}
                    placeholder={activeView === "households" ? "Search households by name, ID, or primary client..." : activeView === "income-plans" ? "Search income plans by client, plan, or representative..." : activeView === "approvals" ? "Search approvals by client name, module, or status..." : "Search by client, account, or status"}
                  className="text-sm lg:w-72 xl:w-96"
                />

                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className="w-[150px] justify-between text-sm font-normal"
                      >
                        {activeView === "households" || activeView === "income-plans" || activeView === "approvals" ? (
                          activeView === "households" ? (
                            (() => {
                              const selectedCount = Object.values(statusFilter).filter(Boolean).length;
                              if (selectedCount === 0) return "Status";
                              if (selectedCount === 1) {
                                return Object.entries(statusFilter).find(([, checked]) => checked)?.[0] || "Status";
                              }
                              return `${selectedCount} selected`;
                            })()
                          ) : activeView === "approvals" ? "Status" : "All Documents"
                        ) : (
                          (() => {
                          const selectedCount = Object.values(docFilter).filter(Boolean).length;
                          if (selectedCount === 0) return "All Documents";
                          if (selectedCount === 1) {
                            return Object.entries(docFilter).find(([, checked]) => checked)?.[0] || "All Documents";
                          }
                          return `${selectedCount} selected`;
                          })()
                        )}
                        <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-[150px] p-2" align="start">
                      <div className="space-y-1">
                        {activeView === "households" ? (
                          (["ACTIVE", "PENDING REVIEW"] as string[]).map(
                            (status) => (
                              <label
                                key={status}
                                className="flex items-center gap-2 px-2 py-1.5 text-sm hover:bg-gray-100 rounded cursor-pointer"
                              >
                                <Checkbox
                                  checked={statusFilter[status]}
                                  onCheckedChange={(checked) => {
                                    setStatusFilter(prev => ({ ...prev, [status]: checked as boolean }));
                                  }}
                                  className="h-4 w-4"
                                />
                                <span>{status}</span>
                              </label>
                            )
                          )
                        ) : activeView === "income-plans" ? (
                          (["Payment Scheduled", "Instructions Required"] as string[]).map(
                            (status) => (
                              <label
                                key={status}
                                className="flex items-center gap-2 px-2 py-1.5 text-sm hover:bg-gray-100 rounded cursor-pointer"
                              >
                                <Checkbox
                                  checked={false}
                                  onCheckedChange={() => {}}
                                  className="h-4 w-4"
                                />
                                <span>{status}</span>
                              </label>
                            )
                          )
                        ) : activeView === "approvals" ? (
                          (["pending", "signed", "approved", "pending_signature", "rejected", "expired", "under_review"] as string[]).map(
                            (status) => (
                              <label
                                key={status}
                                className="flex items-center gap-2 px-2 py-1.5 text-sm hover:bg-gray-100 rounded cursor-pointer"
                              >
                                <Checkbox
                                  checked={false}
                                  onCheckedChange={() => {}}
                                  className="h-4 w-4"
                                />
                                <span>{status}</span>
                              </label>
                            )
                          )
                        ) : (
                          (["Uploaded", "Required", "Missing"] as DocumentStatus[]).map(
                          (status) => (
                            <label
                              key={status}
                              className="flex items-center gap-2 px-2 py-1.5 text-sm hover:bg-gray-100 rounded cursor-pointer"
                            >
                              <Checkbox
                                checked={docFilter[status]}
                                onCheckedChange={() => toggleDocFilter(status)}
                                className="h-4 w-4"
                              />
                              <span>{status}</span>
                            </label>
                            )
                          )
                        )}
                      </div>
                    </PopoverContent>
                  </Popover>

                <Button onClick={() => setShowAddClient(true)}>
                  <Plus className="mr-2 h-4 w-4" />
                  {activeView === "households" ? "Add New Household" : activeView === "income-plans" ? "Add Income Plan" : activeView === "approvals" ? "Add Approval" : "Add Client"}
                </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              {activeView === "approvals" ? (
                <div className="p-6">
                  {/* Approvals Table */}
                  <div className="border border-gray-200 rounded-lg overflow-hidden">
                    <Table>
                      <TableHeader>
                        <TableRow className="bg-gray-50">
                          <TableHead className="text-xs font-semibold text-gray-700">START DATE</TableHead>
                          <TableHead className="text-xs font-semibold text-gray-700">END DATE</TableHead>
                          <TableHead className="text-xs font-semibold text-gray-700">STATUS</TableHead>
                          <TableHead className="text-xs font-semibold text-gray-700">TYPE</TableHead>
                          <TableHead className="text-xs font-semibold text-gray-700">CLIENT NAME</TableHead>
                          <TableHead className="text-xs font-semibold text-gray-700">CLIENT SURNAME</TableHead>
                          <TableHead className="text-xs font-semibold text-gray-700">MODULE</TableHead>
                          <TableHead className="text-xs font-semibold text-gray-700">ACTIONS</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {/* Row 1 */}
                        <TableRow className="hover:bg-gray-50">
                          <TableCell className="text-xs text-gray-700">2024-09-01</TableCell>
                          <TableCell className="text-xs text-gray-700">2024-09-15</TableCell>
                          <TableCell>
                            <Badge className="bg-yellow-100 text-yellow-700 hover:bg-yellow-100 text-xs font-medium px-2 py-0.5">
                              <Clock className="h-3 w-3 mr-1 inline" />
                              pending
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-100 text-xs font-medium px-2 py-0.5">
                              <FileCheck className="h-3 w-3 mr-1 inline" />
                              approval
                            </Badge>
                          </TableCell>
                          <TableCell className="text-xs text-gray-900">Johnson</TableCell>
                          <TableCell className="text-xs text-gray-900">Robert</TableCell>
                          <TableCell className="text-xs text-gray-700">Account Opening</TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                <CheckCircle2 className="h-4 w-4 text-green-600" />
                              </Button>
                              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                <X className="h-4 w-4 text-red-600" />
                              </Button>
                              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                <Eye className="h-4 w-4 text-blue-600" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>

                        {/* Row 2 */}
                        <TableRow className="hover:bg-gray-50">
                          <TableCell className="text-xs text-gray-700">2024-09-05</TableCell>
                          <TableCell className="text-xs text-gray-700">2024-09-20</TableCell>
                          <TableCell>
                            <Badge className="bg-green-100 text-green-700 hover:bg-green-100 text-xs font-medium px-2 py-0.5">
                              <CheckCircle2 className="h-3 w-3 mr-1 inline" />
                              signed
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <Badge className="bg-purple-100 text-purple-700 hover:bg-purple-100 text-xs font-medium px-2 py-0.5">
                              <PenTool className="h-3 w-3 mr-1 inline" />
                              esignature
                            </Badge>
                          </TableCell>
                          <TableCell className="text-xs text-gray-900">Wilson</TableCell>
                          <TableCell className="text-xs text-gray-900">Emma</TableCell>
                          <TableCell className="text-xs text-gray-700">Investment Agreement</TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                <Eye className="h-4 w-4 text-blue-600" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>

                        {/* Row 3 */}
                        <TableRow className="hover:bg-gray-50">
                          <TableCell className="text-xs text-gray-700">2024-09-10</TableCell>
                          <TableCell className="text-xs text-gray-700">2024-09-25</TableCell>
                          <TableCell>
                            <Badge className="bg-green-600 text-white hover:bg-green-600 text-xs font-medium px-2 py-0.5">
                              <CheckCircle2 className="h-3 w-3 mr-1 inline" />
                              approved
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-100 text-xs font-medium px-2 py-0.5">
                              <FileCheck className="h-3 w-3 mr-1 inline" />
                              approval
                            </Badge>
                          </TableCell>
                          <TableCell className="text-xs text-gray-900">Smith</TableCell>
                          <TableCell className="text-xs text-gray-900">Michael</TableCell>
                          <TableCell className="text-xs text-gray-700">Fund Transfer</TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                <Eye className="h-4 w-4 text-blue-600" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>

                        {/* Row 4 */}
                        <TableRow className="hover:bg-gray-50">
                          <TableCell className="text-xs text-gray-700">2024-09-12</TableCell>
                          <TableCell className="text-xs text-gray-700">2024-09-27</TableCell>
                          <TableCell>
                            <Badge className="bg-orange-100 text-orange-700 hover:bg-orange-100 text-xs font-medium px-2 py-0.5">
                              <PenTool className="h-3 w-3 mr-1 inline" />
                              pending_signature
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <Badge className="bg-purple-100 text-purple-700 hover:bg-purple-100 text-xs font-medium px-2 py-0.5">
                              <PenTool className="h-3 w-3 mr-1 inline" />
                              esignature
                            </Badge>
                          </TableCell>
                          <TableCell className="text-xs text-gray-900">Brown</TableCell>
                          <TableCell className="text-xs text-gray-900">Patricia</TableCell>
                          <TableCell className="text-xs text-gray-700">KYC Update</TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                <CheckCircle2 className="h-4 w-4 text-green-600" />
                              </Button>
                              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                <X className="h-4 w-4 text-red-600" />
                              </Button>
                              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                <Eye className="h-4 w-4 text-blue-600" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>

                        {/* Row 5 */}
                        <TableRow className="hover:bg-gray-50">
                          <TableCell className="text-xs text-gray-700">2024-09-15</TableCell>
                          <TableCell className="text-xs text-gray-700">2024-09-30</TableCell>
                          <TableCell>
                            <Badge className="bg-red-100 text-red-700 hover:bg-red-100 text-xs font-medium px-2 py-0.5">
                              <X className="h-3 w-3 mr-1 inline" />
                              rejected
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-100 text-xs font-medium px-2 py-0.5">
                              <FileCheck className="h-3 w-3 mr-1 inline" />
                              approval
                            </Badge>
                          </TableCell>
                          <TableCell className="text-xs text-gray-900">Davis</TableCell>
                          <TableCell className="text-xs text-gray-900">James</TableCell>
                          <TableCell className="text-xs text-gray-700">Withdrawal Request</TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                <Eye className="h-4 w-4 text-blue-600" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>

                        {/* Row 6 */}
                        <TableRow className="hover:bg-gray-50">
                          <TableCell className="text-xs text-gray-700">2024-08-20</TableCell>
                          <TableCell className="text-xs text-gray-700">2024-09-05</TableCell>
                          <TableCell>
                            <Badge className="bg-gray-100 text-gray-700 hover:bg-gray-100 text-xs font-medium px-2 py-0.5">
                              <X className="h-3 w-3 mr-1 inline" />
                              expired
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <Badge className="bg-purple-100 text-purple-700 hover:bg-purple-100 text-xs font-medium px-2 py-0.5">
                              <PenTool className="h-3 w-3 mr-1 inline" />
                              esignature
                            </Badge>
                          </TableCell>
                          <TableCell className="text-xs text-gray-900">Miller</TableCell>
                          <TableCell className="text-xs text-gray-900">Sarah</TableCell>
                          <TableCell className="text-xs text-gray-700">Fee Agreement</TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                <Eye className="h-4 w-4 text-blue-600" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>

                        {/* Row 7 */}
                        <TableRow className="hover:bg-gray-50">
                          <TableCell className="text-xs text-gray-700">2024-09-18</TableCell>
                          <TableCell className="text-xs text-gray-700">2024-10-03</TableCell>
                          <TableCell>
                            <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-100 text-xs font-medium px-2 py-0.5">
                              <Clock className="h-3 w-3 mr-1 inline" />
                              under_review
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-100 text-xs font-medium px-2 py-0.5">
                              <FileCheck className="h-3 w-3 mr-1 inline" />
                              approval
                            </Badge>
                          </TableCell>
                          <TableCell className="text-xs text-gray-900">Taylor</TableCell>
                          <TableCell className="text-xs text-gray-900">David</TableCell>
                          <TableCell className="text-xs text-gray-700">Risk Assessment</TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                <CheckCircle2 className="h-4 w-4 text-green-600" />
                              </Button>
                              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                <X className="h-4 w-4 text-red-600" />
                              </Button>
                              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                <Eye className="h-4 w-4 text-blue-600" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>

                        {/* Row 8 */}
                        <TableRow className="hover:bg-gray-50">
                          <TableCell className="text-xs text-gray-700">2024-09-20</TableCell>
                          <TableCell className="text-xs text-gray-700">2024-10-05</TableCell>
                          <TableCell>
                            <Badge className="bg-yellow-100 text-yellow-700 hover:bg-yellow-100 text-xs font-medium px-2 py-0.5">
                              <Clock className="h-3 w-3 mr-1 inline" />
                              pending
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <Badge className="bg-purple-100 text-purple-700 hover:bg-purple-100 text-xs font-medium px-2 py-0.5">
                              <PenTool className="h-3 w-3 mr-1 inline" />
                              esignature
                            </Badge>
                          </TableCell>
                          <TableCell className="text-xs text-gray-900">Anderson</TableCell>
                          <TableCell className="text-xs text-gray-900">Lisa</TableCell>
                          <TableCell className="text-xs text-gray-700">Plan Amendment</TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                <CheckCircle2 className="h-4 w-4 text-green-600" />
                              </Button>
                              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                <X className="h-4 w-4 text-red-600" />
                              </Button>
                              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                <Eye className="h-4 w-4 text-blue-600" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </div>
                </div>
              ) : activeView === "income-plans" ? (
                <div className="p-6">
                  {/* Income Plans Table */}
                  <div className="border border-gray-200 rounded-lg overflow-hidden">
                    <Table>
                      <TableHeader>
                        <TableRow className="bg-gray-50">
                          <TableHead className="text-xs font-semibold text-gray-700">Client</TableHead>
                          <TableHead className="text-xs font-semibold text-gray-700">Plan</TableHead>
                          <TableHead className="text-xs font-semibold text-gray-700">Representative</TableHead>
                          <TableHead className="text-xs font-semibold text-gray-700 text-right">Minimum</TableHead>
                          <TableHead className="text-xs font-semibold text-gray-700 text-right">Balance to Min</TableHead>
                          <TableHead className="text-xs font-semibold text-gray-700 text-right">Maximum</TableHead>
                          <TableHead className="text-xs font-semibold text-gray-700 text-right">Balance to Max</TableHead>
                          <TableHead className="text-xs font-semibold text-gray-700 text-right">YTD Paid</TableHead>
                          <TableHead className="text-xs font-semibold text-gray-700 text-right">YTD Tax</TableHead>
                          <TableHead className="text-xs font-semibold text-gray-700">Payment Status</TableHead>
                          <TableHead className="text-xs font-semibold text-gray-700">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {/* Row 1 */}
                        <TableRow className="hover:bg-gray-50">
                          <TableCell>
                            <div>
                              <p className="text-sm font-bold text-gray-900">Carriere, Dora</p>
                              <p className="text-xs text-gray-500">ID: 29720</p>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div>
                              <p className="text-sm font-bold text-gray-900">S108113354</p>
                              <p className="text-xs text-gray-500">Locked in RLIF Broker/Nominee, Individual</p>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div>
                              <p className="text-xs text-gray-700">9823-2232</p>
                              <p className="text-xs text-gray-500">Marsh, Antoine</p>
                            </div>
                          </TableCell>
                          <TableCell className="text-right text-xs text-gray-700">{formatCurrency(2992.35)}</TableCell>
                          <TableCell className="text-right text-xs text-green-600">{formatCurrency(1575.79)}</TableCell>
                          <TableCell className="text-right text-xs text-gray-700">{formatCurrency(4249.71)}</TableCell>
                          <TableCell className="text-right text-xs text-green-600">{formatCurrency(2833.15)}</TableCell>
                          <TableCell className="text-right text-xs text-gray-700">{formatCurrency(1374.64)}</TableCell>
                          <TableCell className="text-right text-xs text-gray-700">{formatCurrency(41.92)}</TableCell>
                          <TableCell>
                            <Badge variant="outline" className="border-blue-200 text-blue-700 bg-blue-50 text-xs font-medium px-2 py-0.5">
                              <Clock className="h-3 w-3 mr-1 inline" />
                              Scheduled
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                              <Eye className="h-4 w-4 text-gray-600" />
                            </Button>
                          </TableCell>
                        </TableRow>

                        {/* Row 2 */}
                        <TableRow className="hover:bg-gray-50">
                          <TableCell>
                            <div>
                              <p className="text-sm font-bold text-gray-900">Sharma, Melanie</p>
                              <p className="text-xs text-gray-500">ID: 2663</p>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div>
                              <p className="text-sm font-bold text-gray-900">1322488010</p>
                              <p className="text-xs text-gray-500">RRIF Broker/Nominee, Individual, Fee for Service</p>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div>
                              <p className="text-xs text-gray-700">9823-2232</p>
                              <p className="text-xs text-gray-500">Marsh, Antoine</p>
                            </div>
                          </TableCell>
                          <TableCell className="text-right text-xs text-gray-700">{formatCurrency(77219.08)}</TableCell>
                          <TableCell className="text-right text-xs text-green-600">{formatCurrency(0)}</TableCell>
                          <TableCell className="text-right text-xs text-gray-700">{formatCurrency(0)}</TableCell>
                          <TableCell className="text-right text-xs text-red-600">-{formatCurrency(77219.08)}</TableCell>
                          <TableCell className="text-right text-xs text-gray-700">{formatCurrency(54053.35)}</TableCell>
                          <TableCell className="text-right text-xs text-gray-700">{formatCurrency(23165.73)}</TableCell>
                          <TableCell>
                            <Badge className="bg-green-100 text-green-700 hover:bg-green-100 text-xs font-medium px-2 py-0.5">
                              <CheckCircle2 className="h-3 w-3 mr-1 inline" />
                              Completed
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                              <Eye className="h-4 w-4 text-gray-600" />
                            </Button>
                          </TableCell>
                        </TableRow>

                        {/* Row 3 */}
                        <TableRow className="hover:bg-gray-50">
                          <TableCell>
                            <div>
                              <p className="text-sm font-bold text-gray-900">Sharma, Melanie</p>
                              <p className="text-xs text-gray-500">ID: 2663</p>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div>
                              <p className="text-sm font-bold text-gray-900">4527271322</p>
                              <p className="text-xs text-gray-500">RRIF Broker/Nominee, Spousal, Fee for Service</p>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div>
                              <p className="text-xs text-gray-700">9823-2232</p>
                              <p className="text-xs text-gray-500">Marsh, Antoine</p>
                            </div>
                          </TableCell>
                          <TableCell className="text-right text-xs text-gray-700">{formatCurrency(0)}</TableCell>
                          <TableCell className="text-right text-xs text-green-600">{formatCurrency(0)}</TableCell>
                          <TableCell className="text-right text-xs text-gray-700">{formatCurrency(0)}</TableCell>
                          <TableCell className="text-right text-xs text-red-600">-{formatCurrency(8185.32)}</TableCell>
                          <TableCell className="text-right text-xs text-gray-700">{formatCurrency(0)}</TableCell>
                          <TableCell className="text-right text-xs text-gray-700">{formatCurrency(0)}</TableCell>
                          <TableCell>
                            <Badge className="bg-green-100 text-green-700 hover:bg-green-100 text-xs font-medium px-2 py-0.5">
                              <CheckCircle2 className="h-3 w-3 mr-1 inline" />
                              Completed
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                              <Eye className="h-4 w-4 text-gray-600" />
                            </Button>
                          </TableCell>
                        </TableRow>

                        {/* Row 4 */}
                        <TableRow className="hover:bg-gray-50">
                          <TableCell>
                            <div>
                              <p className="text-sm font-bold text-gray-900">Sharma, Melanie</p>
                              <p className="text-xs text-gray-500">ID: 2663</p>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div>
                              <p className="text-sm font-bold text-gray-900">7545538518</p>
                              <p className="text-xs text-gray-500">Locked in LIF Broker/Nominee, Individual, Fee for Service</p>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div>
                              <p className="text-xs text-gray-700">9823-2232</p>
                              <p className="text-xs text-gray-500">Marsh, Antoine</p>
                            </div>
                          </TableCell>
                          <TableCell className="text-right text-xs text-gray-700">{formatCurrency(0)}</TableCell>
                          <TableCell className="text-right text-xs text-green-600">{formatCurrency(7162.91)}</TableCell>
                          <TableCell className="text-right text-xs text-gray-700">{formatCurrency(0)}</TableCell>
                          <TableCell className="text-right text-xs text-green-600">{formatCurrency(0)}</TableCell>
                          <TableCell className="text-right text-xs text-gray-700">{formatCurrency(0)}</TableCell>
                          <TableCell className="text-right text-xs text-gray-700">{formatCurrency(0)}</TableCell>
                          <TableCell>
                            <Badge className="bg-green-100 text-green-700 hover:bg-green-100 text-xs font-medium px-2 py-0.5">
                              <CheckCircle2 className="h-3 w-3 mr-1 inline" />
                              Completed
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                              <Eye className="h-4 w-4 text-gray-600" />
                            </Button>
                          </TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </div>
                </div>
              ) : activeView === "households" ? (
                <div className="p-6">
                  {/* Households Table */}
                  <div className="border border-gray-200 rounded-lg overflow-hidden">
                    <Table>
                      <TableHeader>
                        <TableRow className="bg-gray-50">
                          <TableHead className="text-xs font-semibold text-gray-700">Household ID</TableHead>
                          <TableHead className="text-xs font-semibold text-gray-700">Name</TableHead>
                          <TableHead className="text-xs font-semibold text-gray-700">Primary Client</TableHead>
                          <TableHead className="text-xs font-semibold text-gray-700">Members</TableHead>
                          <TableHead className="text-xs font-semibold text-gray-700">Total Assets</TableHead>
                          <TableHead className="text-xs font-semibold text-gray-700">Accounts</TableHead>
                          <TableHead className="text-xs font-semibold text-gray-700">Status</TableHead>
                          <TableHead className="text-xs font-semibold text-gray-700">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {/* Household 1 */}
                        <TableRow className="hover:bg-gray-50">
                          <TableCell className="text-xs font-medium text-gray-900">HH001</TableCell>
                          <TableCell className="text-xs text-gray-900">Johnson Family</TableCell>
                          <TableCell className="text-xs text-gray-700">Robert Johnson</TableCell>
                          <TableCell className="text-xs text-gray-700">3</TableCell>
                          <TableCell className="text-xs text-gray-700">{formatCurrency(750000)}</TableCell>
                          <TableCell className="text-xs text-gray-700">4</TableCell>
                          <TableCell>
                            <Badge className="bg-green-100 text-green-700 hover:bg-green-100 text-xs font-medium px-2 py-0.5">
                              ACTIVE
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                <Pencil className="h-4 w-4 text-gray-600" />
                              </Button>
                              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                <Trash2 className="h-4 w-4 text-gray-600" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>

                        {/* Household 2 */}
                        <TableRow className="hover:bg-gray-50">
                          <TableCell className="text-xs font-medium text-gray-900">HH002</TableCell>
                          <TableCell className="text-xs text-gray-900">Smith Household</TableCell>
                          <TableCell className="text-xs text-gray-700">Michael Smith</TableCell>
                          <TableCell className="text-xs text-gray-700">2</TableCell>
                          <TableCell className="text-xs text-gray-700">{formatCurrency(425000)}</TableCell>
                          <TableCell className="text-xs text-gray-700">2</TableCell>
                          <TableCell>
                            <Badge className="bg-green-100 text-green-700 hover:bg-green-100 text-xs font-medium px-2 py-0.5">
                              ACTIVE
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                <Pencil className="h-4 w-4 text-gray-600" />
                              </Button>
                              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                <Trash2 className="h-4 w-4 text-gray-600" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>

                        {/* Household 3 */}
                        <TableRow className="hover:bg-gray-50">
                          <TableCell className="text-xs font-medium text-gray-900">HH003</TableCell>
                          <TableCell className="text-xs text-gray-900">Williams Trust</TableCell>
                          <TableCell className="text-xs text-gray-700">David Williams</TableCell>
                          <TableCell className="text-xs text-gray-700">4</TableCell>
                          <TableCell className="text-xs text-gray-700">{formatCurrency(1250000)}</TableCell>
                          <TableCell className="text-xs text-gray-700">6</TableCell>
                          <TableCell>
                            <Badge className="bg-green-100 text-green-700 hover:bg-green-100 text-xs font-medium px-2 py-0.5">
                              ACTIVE
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                <Pencil className="h-4 w-4 text-gray-600" />
                              </Button>
                              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                <Trash2 className="h-4 w-4 text-gray-600" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>

                        {/* Household 4 */}
                        <TableRow className="hover:bg-gray-50">
                          <TableCell className="text-xs font-medium text-gray-900">HH004</TableCell>
                          <TableCell className="text-xs text-gray-900">Brown Estate</TableCell>
                          <TableCell className="text-xs text-gray-700">Patricia Brown</TableCell>
                          <TableCell className="text-xs text-gray-700">1</TableCell>
                          <TableCell className="text-xs text-gray-700">{formatCurrency(180000)}</TableCell>
                          <TableCell className="text-xs text-gray-700">1</TableCell>
                          <TableCell>
                            <Badge className="bg-yellow-100 text-yellow-700 hover:bg-yellow-100 text-xs font-medium px-2 py-0.5">
                              PENDING REVIEW
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                <Pencil className="h-4 w-4 text-gray-600" />
                              </Button>
                              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                <Trash2 className="h-4 w-4 text-gray-600" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </div>
                </div>
              ) : isLoading ? (
                <div className="flex items-center justify-center py-16 text-gray-500">
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Loading clients…
                </div>
              ) : filteredClients.length === 0 ? (
                <div className="py-16 text-center">
                  <h3 className="text-base font-semibold text-gray-900">
                    No clients found
                  </h3>
                  <p className="mt-2 text-sm text-gray-500">
                    {clients.length === 0
                      ? 'No clients yet. Click “Add Client” to create your first record.'
                      : "No clients match your filters. Try adjusting your search."}
                  </p>
                  <Button onClick={() => setShowAddClient(true)} className="mt-4">
                    <Plus className="mr-2 h-4 w-4" />
                    Add Client
                  </Button>
                </div>
              ) : selectedClient ? (
                <div className="w-full">
                  {/* Client View - Full Width with Tabs */}
                  <div className="h-full px-4 pb-4">
                      <div className="sticky top-0 pt-4 bg-white z-10 pb-4">
                        <div className="flex items-center justify-between mb-4">
                          <div>
                            <h3 className="text-lg font-semibold text-gray-900">
                              {selectedClient.name}
                            </h3>
                            <p className="text-sm text-gray-600 mt-1">
                              Account {selectedClient.accountNumber}
                            </p>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => {
                              setSelectedClient(null);
                              setClientViewTab("details");
                            }}
                            className="h-8 w-8 p-0"
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                        <div className="mt-4">
                          <ScrollArea className="h-[calc(100vh-380px)] pr-2">
                            <div className="space-y-4">
                            {/* Client Summary - Tiles */}
                            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-2.5">
                              {/* Mailing Address Tile */}
                              <Card className="border border-gray-200 shadow-sm bg-white h-full">
                                <CardContent className="p-2.5">
                                  <p className="text-[10px] font-semibold text-gray-900 mb-1.5">Mailing Address</p>
                                  <div className="text-[11px] text-gray-700 space-y-0.5">
                                    <p className="leading-tight">{selectedClient.address || "N/A"}</p>
                                    <p className="leading-tight">
                                      {[
                                        selectedClient.city,
                                        selectedClient.province,
                                        selectedClient.postalCode
                                      ].filter(Boolean).join(' ')}
                                    </p>
                                    <p className="leading-tight">Home: {selectedClient.phone || "N/A"}</p>
                                    <p className="leading-tight">Cell: {selectedClient.phone || "N/A"}</p>
                                  </div>
                                </CardContent>
                              </Card>

                              {/* Residential Address Tile */}
                              <Card className="border border-gray-200 shadow-sm bg-white h-full">
                                <CardContent className="p-2.5">
                                  <p className="text-[10px] font-semibold text-gray-900 mb-1.5">Residential Address</p>
                                  <div className="text-[11px] text-gray-700 space-y-0.5">
                                    <p className="leading-tight">{selectedClient.address || "N/A"}</p>
                                    <p className="leading-tight">
                                      {[
                                        selectedClient.city,
                                        selectedClient.province,
                                        selectedClient.postalCode
                                      ].filter(Boolean).join(' ')}
                                    </p>
                                  </div>
                                </CardContent>
                              </Card>

                              {/* Email Address Tile */}
                              <Card className="border border-gray-200 shadow-sm bg-white h-full">
                                <CardContent className="p-2.5">
                                  <p className="text-[10px] font-semibold text-gray-900 mb-1.5">Email Address</p>
                                  <p className="text-[11px] text-blue-600 underline leading-tight">{selectedClient.email || "N/A"}</p>
                                </CardContent>
                              </Card>

                              {/* Preferred Language Tile */}
                              <Card className="border border-gray-200 shadow-sm bg-white h-full">
                                <CardContent className="p-2.5">
                                  <p className="text-[10px] font-semibold text-gray-900 mb-1.5">Preferred Language</p>
                                  <p className="text-[11px] text-gray-700 leading-tight">English</p>
                                </CardContent>
                              </Card>

                              {/* Current Representative Tile */}
                              <Card className="border border-gray-200 shadow-sm bg-white h-full">
                                <CardContent className="p-2.5">
                                  <p className="text-[10px] font-semibold text-gray-900 mb-1.5">Current Representative</p>
                                  <p className="text-[11px] text-gray-700 leading-tight">Marsh, Antoine</p>
                                </CardContent>
                              </Card>

                              {/* Total Assets Tile */}
                              <Card className="border border-gray-200 shadow-sm bg-white h-full">
                                <CardContent className="p-2.5">
                                  <div className="flex items-center gap-1.5 mb-1.5">
                                    <p className="text-[10px] font-semibold text-blue-600">Total Assets</p>
                                    <BarChart3 className="h-3 w-3 text-blue-600" />
                                  </div>
                                  <p className="text-[11px] text-blue-600 underline font-medium leading-tight">
                                    {Array.isArray(selectedClient.plans) 
                                      ? formatCurrency(selectedClient.plans.reduce((sum, plan) => sum + plan.marketValue, 0))
                                      : formatCurrency(0)}
                                  </p>
                                </CardContent>
                              </Card>
                            </div>

                            {/* Dropdowns below summary cards */}
                            <div className="flex gap-2 mt-4">
                              {/* Map Dropdown */}
                              <Collapsible 
                                open={mapDropdownOpen}
                                onOpenChange={setMapDropdownOpen}
                                className="flex-1"
                              >
                                <CollapsibleTrigger asChild>
                                  <Button 
                                    variant="outline" 
                                    size="sm"
                                    className="w-full text-xs h-7 justify-between"
                                  >
                                    Map
                                    <ChevronDown className={`h-3 w-3 transition-transform ${mapDropdownOpen ? "rotate-180" : ""}`} />
                                  </Button>
                                </CollapsibleTrigger>
                                <CollapsibleContent className="mt-1">
                                  <div className="border border-gray-200 rounded-md bg-white shadow-sm overflow-hidden">
                                    {/* Dummy Map */}
                                    <div className="w-full h-[300px] bg-gray-100 relative flex items-center justify-center">
                                      {/* Map placeholder with grid pattern */}
                                      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-green-50">
                                        {/* Grid lines */}
                                        <svg className="w-full h-full opacity-30" xmlns="http://www.w3.org/2000/svg">
                                          <defs>
                                            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                                              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#94a3b8" strokeWidth="1"/>
                                            </pattern>
                                          </defs>
                                          <rect width="100%" height="100%" fill="url(#grid)" />
                                        </svg>
                                        {/* Map marker/pin */}
                                        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                                          <div className="relative">
                                            <div className="w-6 h-6 bg-red-500 rounded-full border-2 border-white shadow-lg"></div>
                                            <div className="absolute top-6 left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-8 border-transparent border-t-red-500"></div>
                                          </div>
                                        </div>
                                        {/* Map label */}
                                        <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-md shadow-sm border border-gray-200">
                                          <p className="text-xs font-medium text-gray-900">Toronto, ON</p>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </CollapsibleContent>
                              </Collapsible>

                              {/* Client and Plan Exceptions Dropdown */}
                              <Collapsible 
                                open={exceptionsDropdownOpen}
                                onOpenChange={setExceptionsDropdownOpen}
                                className="flex-1"
                              >
                                <CollapsibleTrigger asChild>
                                  <Button 
                                    variant="outline" 
                                    size="sm"
                                    className="w-full text-xs h-7 justify-between"
                                  >
                                    Client and Plan Exceptions
                                    <ChevronDown className={`h-3 w-3 transition-transform ${exceptionsDropdownOpen ? "rotate-180" : ""}`} />
                                  </Button>
                                </CollapsibleTrigger>
                                <CollapsibleContent className="mt-1">
                                  <div className="border border-gray-200 rounded-md bg-gray-50 shadow-sm">
                                    {/* Client Exceptions Section */}
                                    <div className="p-4 border-b border-gray-200">
                                      <h4 className="text-sm font-bold text-blue-600 mb-2 pb-1 border-b border-blue-600">
                                        Client Exceptions
                                      </h4>
                                      <div className="space-y-2 mt-3">
                                        <p className="text-xs text-red-600">Please indicate the client's Domestic Politically Exposed Person eligibility</p>
                                        <p className="text-xs text-red-600">Please indicate the client's Head of International Organization eligibility</p>
                                        <p className="text-xs text-red-600">Please indicate the client's family member Head of International Organization eligibility</p>
                                        <p className="text-xs text-red-600">Missing SSN or FATCA No TIN</p>
                                        <p className="text-xs text-red-600">Please indicate the client's Politically Exposed Person eligibility</p>
                                        <p className="text-xs text-red-600">Please indicate the client's family member Foreign Politically Exposed Person eligibility</p>
                                        <p className="text-xs text-red-600">Please select a marital status.</p>
                                        <p className="text-xs text-red-600">Please indicate the client's family member Domestic Politically Exposed Person eligibility</p>
                                      </div>
                                    </div>

                                    {/* Plan Exceptions Section */}
                                    <div className="p-4">
                                      <h4 className="text-sm font-bold text-blue-600 mb-2 pb-1 border-b border-blue-600">
                                        Plan Exceptions
                                      </h4>
                                      <div className="space-y-2 mt-3">
                                        <p className="text-xs text-red-600">Plan 3641343426 Please fill missing Plan Details</p>
                                        <p className="text-xs text-red-600">Plan 3641343426 Please specify Intent of Use</p>
                                        <p className="text-xs text-red-600">Plan 3641343426 Please enter all the missing Plan information.</p>
                                      </div>
                                    </div>
                                  </div>
                                </CollapsibleContent>
                              </Collapsible>
                            </div>

                            {/* Plans */}
                            {Array.isArray(selectedClient.plans) && selectedClient.plans.length > 0 && (
                              <Card className="border border-gray-200 shadow-sm bg-white">
                                <CardHeader className="pb-3">
                                  <div className="flex items-center justify-between">
                                  <CardTitle className="text-sm font-semibold text-gray-900">
                                    Plans ({selectedClient.plans.length})
                                  </CardTitle>
                                    <Button 
                                      variant="outline" 
                                      size="sm"
                                      className="text-xs h-7"
                                      onClick={() => {
                                        setShowAddPlanDialog(true);
                                        setAddPlanStep("select-type");
                                        setSelectedPlanType("");
                                        setNewPlanData({
                                          ownerName: selectedClient.name.split(' ')[0] || "",
                                          beneficiaryName: "",
                                          intermediaryCode: "",
                                          intermediaryAccountCode: "",
                                          notes: "",
                                          objectives: "",
                                          riskTolerance: "",
                                          timeHorizon: "",
                                        });
                                      }}
                                    >
                                      <Plus className="h-3 w-3 mr-1" />
                                      Add Plan
                                    </Button>
                                  </div>
                                </CardHeader>
                                <CardContent>
                                  <div className="space-y-3">
                                    {selectedClient.plans.map((plan) => {
                                      const isExpanded = expandedPlans.has(plan.id);
                                      return (
                                        <div key={plan.id} className="border border-gray-200 rounded-lg overflow-hidden">
                                          <button
                                            onClick={() => togglePlanExpansion(plan.id)}
                                            className="w-full p-3 hover:bg-gray-50 transition-colors text-left"
                                          >
                                            <div className="flex items-center justify-between">
                                              <div className="flex-1">
                                                <div className="flex items-center gap-2 mb-2 flex-wrap">
                                                  <span className="text-sm font-medium text-gray-900">
                                                    {plan.type === "RESP" ? "RESP Education Savings Plan" : plan.type}
                                                  </span>
                                                  {plan.planCategory && (
                                                    <>
                                                      <span className="text-gray-400">•</span>
                                                      <span className="text-sm text-gray-600">{plan.planCategory}</span>
                                                    </>
                                                  )}
                                        </div>
                                                <div className="flex items-center gap-2 text-xs text-gray-600 flex-wrap">
                                                  <span>Account: {plan.accountNumber}</span>
                                                  {plan.accountHolder && (
                                                    <>
                                                      <span className="text-gray-400">•</span>
                                                      <span>{plan.accountHolder}</span>
                                                    </>
                                                  )}
                                                  {plan.riskLevel && (
                                                    <>
                                                      <span className="text-gray-400">•</span>
                                                      <span>Risk: {plan.riskLevel}</span>
                                                    </>
                                                  )}
                                                  {plan.objective && (
                                                    <>
                                                      <span className="text-gray-400">•</span>
                                                      <span>Objective: {plan.objective}</span>
                                                    </>
                                                  )}
                                                </div>
                                                <div className="text-xs text-gray-500 mt-1">
                                                  Market Value: {formatCurrency(plan.marketValue)}
                                      </div>
                                              </div>
                                              {isExpanded ? (
                                                <ChevronUp className="h-4 w-4 text-gray-400 ml-2" />
                                              ) : (
                                                <ChevronDown className="h-4 w-4 text-gray-400 ml-2" />
                                              )}
                                            </div>
                                          </button>
                                          {isExpanded && plan.holdings && plan.holdings.length > 0 && (
                                            <div className="border-t border-gray-200 bg-white">
                                              <div className="p-4">
                                                <Table>
                                                  <TableHeader>
                                                    <TableRow>
                                                      <TableHead className="text-center">Symbol</TableHead>
                                                      <TableHead className="w-[200px]">Product</TableHead>
                                                      <TableHead className="text-center">Shares</TableHead>
                                                      <TableHead className="text-center">Price</TableHead>
                                                      <TableHead className="text-center">Market Value</TableHead>
                                                      <TableHead className="text-center">Net Invested</TableHead>
                                                      <TableHead className="text-center">Total Book Value</TableHead>
                                                      <TableHead className="text-center">Actions</TableHead>
                                                    </TableRow>
                                                  </TableHeader>
                                                  <TableBody>
                                                    {plan.holdings.map((holding, index) => (
                                                      <TableRow key={index} className="hover:bg-gray-50">
                                                        <TableCell className="text-center text-sm font-medium text-gray-900">
                                                          {holding.symbol}
                                                        </TableCell>
                                                        <TableCell>
                                                          <span className="text-xs font-medium text-gray-900">
                                                            {holding.name}
                                                          </span>
                                                        </TableCell>
                                                        <TableCell className="text-center text-sm text-gray-700">
                                                          {holding.shares.toLocaleString(undefined, {
                                                            minimumFractionDigits: 2,
                                                            maximumFractionDigits: 2,
                                                          })}
                                                        </TableCell>
                                                        <TableCell className="text-center text-sm text-gray-700">
                                                          {formatCurrency(holding.price)}
                                                        </TableCell>
                                                        <TableCell className="text-center text-sm text-gray-700">
                                                          {formatCurrency(holding.marketValue)}
                                                        </TableCell>
                                                        <TableCell className="text-center text-sm text-gray-700">
                                                          {formatCurrency(holding.costBasis)}
                                                        </TableCell>
                                                        <TableCell className="text-center text-sm text-gray-700">
                                                          {formatCurrency(holding.costBasis)}
                                                        </TableCell>
                                                        <TableCell className="text-center">
                                                          <div className="flex items-center justify-center gap-2">
                                                            <Button
                                                              variant="ghost"
                                                              size="sm"
                                                              className="h-8 w-8 p-0"
                                                              onClick={() => {
                                                                setSelectedHolding({ holding, plan });
                                                                setShowBuyUnits(true);
                                                              }}
                                                              title="Buy more units"
                                                            >
                                                              <Plus className="h-4 w-4" />
                                                            </Button>
                                                            <Button
                                                              variant="ghost"
                                                              size="sm"
                                                              className="h-8 w-8 p-0"
                                                              onClick={() => {
                                                                setSelectedHolding({ holding, plan });
                                                                setShowSellUnits(true);
                                                              }}
                                                              title="Sell units"
                                                            >
                                                              <Minus className="h-4 w-4" />
                                                            </Button>
                                                            <Button
                                                              variant="ghost"
                                                              size="sm"
                                                              className="h-8 w-8 p-0"
                                                              onClick={() => {
                                                                setSelectedHolding({ holding, plan });
                                                                setShowSwitchFund(true);
                                                              }}
                                                              title="Switch or Convert fund"
                                                            >
                                                              <ArrowLeftRight className="h-4 w-4" />
                                                            </Button>
                                                          </div>
                                                        </TableCell>
                                                      </TableRow>
                                                    ))}
                                                    {/* Empty row with Add Product button */}
                                                    <TableRow className="hover:bg-gray-50">
                                                      <TableCell className="text-center"></TableCell>
                                                      <TableCell></TableCell>
                                                      <TableCell className="text-center"></TableCell>
                                                      <TableCell className="text-center"></TableCell>
                                                      <TableCell className="text-center"></TableCell>
                                                      <TableCell className="text-center"></TableCell>
                                                      <TableCell className="text-center"></TableCell>
                                                      <TableCell className="text-center">
                                                        <Button
                                                          variant="ghost"
                                                          size="sm"
                                                          className="h-8 text-xs"
                                                          onClick={() => {
                                                            setSelectedPlanForProduct(plan);
                                                            setShowAddProductDialog(true);
                                                            setAddProductData({
                                                              fundCompany: "",
                                                              selectedFund: "",
                                                              investmentAmount: "",
                                                            });
                                                          }}
                                                        >
                                                          <Plus className="h-3 w-3 mr-1" />
                                                          Add Product
                                                        </Button>
                                                      </TableCell>
                                                    </TableRow>
                                                    {/* Totals row */}
                                                    <TableRow className="bg-gray-50 font-semibold">
                                                      <TableCell className="text-center text-sm text-gray-900" colSpan={2}>
                                                        Totals
                                                      </TableCell>
                                                      <TableCell className="text-center"></TableCell>
                                                      <TableCell className="text-center"></TableCell>
                                                      <TableCell className="text-center text-sm text-gray-900">
                                                        {formatCurrency(
                                                          plan.holdings.reduce((sum, holding) => sum + holding.marketValue, 0)
                                                        )}
                                                      </TableCell>
                                                      <TableCell className="text-center text-sm text-gray-900">
                                                        {formatCurrency(
                                                          plan.holdings.reduce((sum, holding) => sum + holding.costBasis, 0)
                                                        )}
                                                      </TableCell>
                                                      <TableCell className="text-center text-sm text-gray-900">
                                                        {formatCurrency(
                                                          plan.holdings.reduce((sum, holding) => sum + holding.costBasis, 0)
                                                        )}
                                                      </TableCell>
                                                      <TableCell className="text-center"></TableCell>
                                                    </TableRow>
                                                  </TableBody>
                                                </Table>
                                                
                                                {/* Trust Account Cards */}
                                                <div className="mt-6 grid grid-cols-3 gap-4">
                                                  {/* Trust Account CAD */}
                                                  <Card className="border border-gray-200 shadow-sm">
                                                    <CardContent className="p-4">
                                                      <p className="text-xs text-gray-500 mb-2">Trust Account CAD</p>
                                                      <p className="text-2xl font-bold text-gray-900 mb-3">$0.00</p>
                                                      <div className="space-y-1">
                                                        <div className="flex justify-between text-xs">
                                                          <span className="text-gray-500">Settled:</span>
                                                          <span className="text-green-600 font-medium">$0.00</span>
                                              </div>
                                                        <div className="flex justify-between text-xs">
                                                          <span className="text-gray-500">Unsettled:</span>
                                                          <span className="text-red-600 font-medium">$0.00</span>
                                            </div>
                                                      </div>
                                                    </CardContent>
                                                  </Card>

                                                  {/* Trust Account USD */}
                                                  <Card className="border border-gray-200 shadow-sm">
                                                    <CardContent className="p-4">
                                                      <p className="text-xs text-gray-500 mb-2">Trust Account USD</p>
                                                      <p className="text-2xl font-bold text-gray-900 mb-3">$0.00</p>
                                                      <div className="space-y-1">
                                                        <div className="flex justify-between text-xs">
                                                          <span className="text-gray-500">Settled:</span>
                                                          <span className="text-green-600 font-medium">$0.00</span>
                                                        </div>
                                                        <div className="flex justify-between text-xs">
                                                          <span className="text-gray-500">Unsettled:</span>
                                                          <span className="text-red-600 font-medium">$0.00</span>
                                                        </div>
                                                      </div>
                                                    </CardContent>
                                                  </Card>

                                                  {/* Total in CAD */}
                                                  <Card className="border border-gray-200 shadow-sm">
                                                    <CardContent className="p-4">
                                                      <p className="text-xs text-gray-500 mb-2">Total in CAD</p>
                                                      <p className="text-2xl font-bold text-green-600">
                                                        {formatCurrency(
                                                          plan.holdings.reduce((sum, holding) => sum + holding.marketValue, 0)
                                                        )}
                                                      </p>
                                                    </CardContent>
                                                  </Card>
                                                </div>

                                                {/* Deposit Button */}
                                                <div className="mt-4 flex justify-center">
                                                  <Button 
                                                    className="bg-blue-600 hover:bg-blue-700 text-white"
                                                    onClick={(e) => {
                                                      e.preventDefault();
                                                      e.stopPropagation();
                                                      setShowDepositDialog(true);
                                                    }}
                                                    type="button"
                                                  >
                                                    <Plus className="h-4 w-4 mr-2" />
                                                    Deposit
                                                  </Button>
                                                </div>
                                              </div>
                                            </div>
                                          )}
                                        </div>
                                      );
                                    })}
                                  </div>
                                </CardContent>
                              </Card>
                            )}

                            {/* Recent Activity */}
                            {selectedClient.recentActivity && selectedClient.recentActivity.length > 0 && (
                              <Card className="border border-gray-200 shadow-sm bg-white">
                                <CardHeader className="pb-3">
                                  <CardTitle className="text-sm font-semibold text-gray-900">Recent Activity</CardTitle>
                                </CardHeader>
                                <CardContent>
                                  <div className="space-y-2">
                                    {selectedClient.recentActivity.map((item, index) => (
                                      <div key={index} className="text-sm text-gray-700">
                                        <p className="font-medium">{item.label}</p>
                                        <p className="text-xs text-gray-500">{item.timestamp}</p>
                                      </div>
                                    ))}
                                  </div>
                                </CardContent>
                              </Card>
                            )}
                            </div>
                          </ScrollArea>
                        </div>
                      </div>
                    </div>
                  </div>
              ) : (
                <div className="py-16 text-center">
                  <h3 className="text-base font-semibold text-gray-900">
                    No client selected
                  </h3>
                  <p className="mt-2 text-sm text-gray-500">
                    Select a client from the sidebar to view details.
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </PageLayout>

      {/* Add Client Dialog */}
      <Dialog open={showAddClient} onOpenChange={setShowAddClient}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Add New Client</DialogTitle>
            <DialogDescription>
              Enter the client information to create a new client record.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="clientName">Full Name <span className="text-red-500">*</span></Label>
                <Input id="clientName" placeholder="John Smith" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="clientAccount">Account Number <span className="text-red-500">*</span></Label>
                <Input id="clientAccount" placeholder="A-000000" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="clientEmail">Email <span className="text-red-500">*</span></Label>
                <Input id="clientEmail" type="email" placeholder="email@example.com" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="clientPhone">Phone <span className="text-red-500">*</span></Label>
                <Input id="clientPhone" type="tel" placeholder="(416) 555-0000" />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="clientAddress">Address</Label>
              <Input id="clientAddress" placeholder="123 Main Street" />
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="clientCity">City</Label>
                <Input id="clientCity" placeholder="Toronto" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="clientProvince">Province</Label>
                <Input id="clientProvince" placeholder="ON" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="clientPostal">Postal Code</Label>
                <Input id="clientPostal" placeholder="M5H 2N2" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="clientStatus">Status</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Active">Active</SelectItem>
                    <SelectItem value="Inactive">Inactive</SelectItem>
                    <SelectItem value="Prospect">Prospect</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="clientDocuments">Documents</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Uploaded">Uploaded</SelectItem>
                    <SelectItem value="Required">Required</SelectItem>
                    <SelectItem value="Missing">Missing</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowAddClient(false)}>
              Cancel
            </Button>
            <Button onClick={() => setShowAddClient(false)}>
              Add Client
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Add Plan Dialog */}
      <Dialog open={showAddPlanDialog} onOpenChange={setShowAddPlanDialog}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Add New Plan</DialogTitle>
            <DialogDescription>
              Create a new plan for {selectedClient?.name || "the client"}.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="planType">Plan Type <span className="text-red-500">*</span></Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select plan type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="RRSP">RRSP</SelectItem>
                  <SelectItem value="TFSA">TFSA</SelectItem>
                  <SelectItem value="RESP">RESP</SelectItem>
                  <SelectItem value="RRIF">RRIF</SelectItem>
                  <SelectItem value="Non-Registered">Non-Registered</SelectItem>
                  <SelectItem value="LIRA">LIRA</SelectItem>
                  <SelectItem value="LIF">LIF</SelectItem>
                  <SelectItem value="OPEN">OPEN</SelectItem>
                  <SelectItem value="LRIF">LRIF</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="planAccountNumber">Account Number <span className="text-red-500">*</span></Label>
              <Input id="planAccountNumber" placeholder="RRSP-000000" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="planCategory">Plan Category</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Individual Plan">Individual Plan</SelectItem>
                  <SelectItem value="Family Plan">Family Plan</SelectItem>
                  <SelectItem value="Spousal Plan">Spousal Plan</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="planAccountHolder">Account Holder</Label>
              <Input id="planAccountHolder" placeholder="Smith, John" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="planRiskLevel">Risk Level</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select risk level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Conservative">Conservative</SelectItem>
                    <SelectItem value="Medium">Medium</SelectItem>
                    <SelectItem value="Aggressive">Aggressive</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="planObjective">Objective</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select objective" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Growth">Growth</SelectItem>
                    <SelectItem value="Income">Income</SelectItem>
                    <SelectItem value="Retirement">Retirement</SelectItem>
                    <SelectItem value="Education">Education</SelectItem>
                    <SelectItem value="Speculation">Speculation</SelectItem>
                    <SelectItem value="Preservation">Preservation</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowAddPlanDialog(false)}>
              Cancel
            </Button>
            <Button onClick={() => setShowAddPlanDialog(false)}>
              Add Plan
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Deposit Dialog */}
      <Dialog open={showDepositDialog} onOpenChange={setShowDepositDialog}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Deposit Funds</DialogTitle>
            <DialogDescription>
              Add funds to the selected plan.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="depositAmount">Deposit Amount <span className="text-red-500">*</span></Label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
                <Input
                  id="depositAmount"
                  type="number"
                  value={depositAmount}
                  onChange={(e) => setDepositAmount(e.target.value)}
                  placeholder="0.00"
                  className="pl-8"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="depositCurrency">Currency</Label>
              <Select defaultValue="CAD">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="CAD">CAD</SelectItem>
                  <SelectItem value="USD">USD</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="depositAccount">Trust Account</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select account" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="CAD">Trust Account CAD</SelectItem>
                  <SelectItem value="USD">Trust Account USD</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="depositNotes">Notes</Label>
              <Textarea
                id="depositNotes"
                placeholder="Optional notes about this deposit..."
                rows={3}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => {
              setShowDepositDialog(false);
              setDepositAmount("0.00");
            }}>
              Cancel
            </Button>
            <Button onClick={() => {
              setShowDepositDialog(false);
              setDepositAmount("0.00");
            }}>
              Process Deposit
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Add Product Dialog */}
      <Dialog open={showAddProductDialog} onOpenChange={setShowAddProductDialog}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Add Product to Plan</DialogTitle>
            <DialogDescription>
              Add a new product to {selectedPlanForProduct?.type || "the plan"}.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="fundCompany">Fund Company <span className="text-red-500">*</span></Label>
              <Select
                value={addProductData.fundCompany}
                onValueChange={(value) => setAddProductData({ ...addProductData, fundCompany: value, selectedFund: "" })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select fund company" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Fidelity">Fidelity</SelectItem>
                  <SelectItem value="TD Asset Management">TD Asset Management</SelectItem>
                  <SelectItem value="Vanguard">Vanguard</SelectItem>
                  <SelectItem value="iShares">iShares</SelectItem>
                  <SelectItem value="BMO">BMO</SelectItem>
                  <SelectItem value="RBC">RBC</SelectItem>
                  <SelectItem value="CIBC">CIBC</SelectItem>
                  <SelectItem value="Scotia">Scotia</SelectItem>
                  <SelectItem value="Manulife">Manulife</SelectItem>
                  <SelectItem value="Mackenzie">Mackenzie</SelectItem>
                </SelectContent>
              </Select>
            </div>
            {addProductData.fundCompany && (
              <div className="space-y-2">
                <Label htmlFor="selectedFund">Fund/Product <span className="text-red-500">*</span></Label>
                <Select
                  value={addProductData.selectedFund}
                  onValueChange={(value) => setAddProductData({ ...addProductData, selectedFund: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select fund" />
                  </SelectTrigger>
                  <SelectContent>
                    {FUND_DATABASE.filter(f => f.company === addProductData.fundCompany).map((fund) => (
                      <SelectItem key={fund.symbol} value={fund.symbol}>
                        {fund.name} ({fund.symbol})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}
            <div className="space-y-2">
              <Label htmlFor="investmentAmount">Investment Amount <span className="text-red-500">*</span></Label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
                <Input
                  id="investmentAmount"
                  type="number"
                  value={addProductData.investmentAmount}
                  onChange={(e) => setAddProductData({ ...addProductData, investmentAmount: e.target.value })}
                  placeholder="0.00"
                  className="pl-8"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="productNotes">Notes</Label>
              <Textarea
                id="productNotes"
                placeholder="Optional notes about this product..."
                rows={3}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => {
              setShowAddProductDialog(false);
              setAddProductData({ fundCompany: "", selectedFund: "", investmentAmount: "" });
            }}>
              Cancel
            </Button>
            <Button onClick={() => {
              setShowAddProductDialog(false);
              setAddProductData({ fundCompany: "", selectedFund: "", investmentAmount: "" });
            }}>
              Add Product
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Switch Fund Dialog */}
      <Dialog open={showSwitchFund} onOpenChange={setShowSwitchFund}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {selectedHolding && switchData.selectedCompany && (() => {
                // Determine if it's a switch (same company) or convert (different company)
                const holdingName = selectedHolding.holding.name.toLowerCase();
                const holdingSymbol = selectedHolding.holding.symbol.toLowerCase();
                const fromCompany = FUND_DATABASE.find(f => 
                  holdingName.includes(f.company.toLowerCase()) ||
                  holdingSymbol.includes(f.symbol.toLowerCase()) ||
                  (holdingName.includes("vanguard") && f.company === "Vanguard") ||
                  (holdingName.includes("ishares") && f.company === "iShares") ||
                  (holdingSymbol.startsWith("vfv") && f.company === "Vanguard") ||
                  (holdingSymbol.startsWith("xic") && f.company === "iShares") ||
                  (holdingSymbol.startsWith("zag") && f.company === "BMO") ||
                  (holdingSymbol.startsWith("vab") && f.company === "Vanguard") ||
                  (holdingSymbol.startsWith("vcn") && f.company === "Vanguard") ||
                  (holdingSymbol.startsWith("xaw") && f.company === "iShares")
                )?.company || "";
                const isSwitch = fromCompany === switchData.selectedCompany;
                return isSwitch ? "Switch Fund" : "Convert Fund";
              })() || "Switch or Convert Fund"}
            </DialogTitle>
            <DialogDescription>
              {selectedHolding && switchData.selectedCompany && (() => {
                const holdingName = selectedHolding.holding.name.toLowerCase();
                const holdingSymbol = selectedHolding.holding.symbol.toLowerCase();
                const fromCompany = FUND_DATABASE.find(f => 
                  holdingName.includes(f.company.toLowerCase()) ||
                  holdingSymbol.includes(f.symbol.toLowerCase()) ||
                  (holdingName.includes("vanguard") && f.company === "Vanguard") ||
                  (holdingName.includes("ishares") && f.company === "iShares") ||
                  (holdingSymbol.startsWith("vfv") && f.company === "Vanguard") ||
                  (holdingSymbol.startsWith("xic") && f.company === "iShares") ||
                  (holdingSymbol.startsWith("zag") && f.company === "BMO") ||
                  (holdingSymbol.startsWith("vab") && f.company === "Vanguard") ||
                  (holdingSymbol.startsWith("vcn") && f.company === "Vanguard") ||
                  (holdingSymbol.startsWith("xaw") && f.company === "iShares")
                )?.company || "";
                const isSwitch = fromCompany === switchData.selectedCompany;
                return isSwitch 
                  ? "Switch from one fund to another within the same company."
                  : "Convert from one fund to another across different companies.";
              })() || "Switch or convert from one fund to another."}
            </DialogDescription>
          </DialogHeader>
          {selectedHolding && (
            <div className="space-y-4 py-4">
              <div className="bg-gray-50 p-4 rounded-lg space-y-2">
                <p className="text-sm font-semibold text-gray-700 mb-2">From Fund:</p>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Symbol:</span>
                  <span className="text-sm font-medium text-gray-900">{selectedHolding.holding.symbol}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Product:</span>
                  <span className="text-sm font-medium text-gray-900">{selectedHolding.holding.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Shares:</span>
                  <span className="text-sm font-medium text-gray-900">{selectedHolding.holding.shares.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Market Value:</span>
                  <span className="text-sm font-medium text-gray-900">{formatCurrency(selectedHolding.holding.marketValue)}</span>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="switchUnits">Units to Switch <span className="text-red-500">*</span></Label>
                <Input
                  id="switchUnits"
                  type="number"
                  value={switchData.units}
                  onChange={(e) => {
                    const units = parseFloat(e.target.value) || 0;
                    const estimatedValue = units * selectedHolding.holding.price;
                    setSwitchData({ ...switchData, units: e.target.value, estimatedValue });
                  }}
                  placeholder="Enter units"
                />
                <p className="text-xs text-gray-500">
                  Available: {selectedHolding.holding.shares.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} shares
                </p>
              </div>
              <div className="space-y-2">
                <Label htmlFor="switchCompany">Fund Company <span className="text-red-500">*</span></Label>
                <Select
                  value={switchData.selectedCompany}
                  onValueChange={(value) => setSwitchData({ ...switchData, selectedCompany: value, selectedFund: "", selectedFundSymbol: "" })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select fund company" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Fidelity">Fidelity</SelectItem>
                    <SelectItem value="TD Asset Management">TD Asset Management</SelectItem>
                    <SelectItem value="Vanguard">Vanguard</SelectItem>
                    <SelectItem value="iShares">iShares</SelectItem>
                    <SelectItem value="BMO">BMO</SelectItem>
                    <SelectItem value="RBC">RBC</SelectItem>
                    <SelectItem value="CIBC">CIBC</SelectItem>
                    <SelectItem value="Scotia">Scotia</SelectItem>
                    <SelectItem value="Manulife">Manulife</SelectItem>
                    <SelectItem value="Mackenzie">Mackenzie</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              {switchData.selectedCompany && (
                <div className="space-y-2">
                  <Label htmlFor="switchFund">To Fund <span className="text-red-500">*</span></Label>
                  <Select
                    value={switchData.selectedFund}
                    onValueChange={(value) => {
                      const fund = FUND_DATABASE.find(f => f.symbol === value);
                      setSwitchData({ ...switchData, selectedFund: fund?.name || "", selectedFundSymbol: value });
                    }}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select fund" />
                    </SelectTrigger>
                    <SelectContent>
                      {FUND_DATABASE.filter(f => f.company === switchData.selectedCompany).map((fund) => (
                        <SelectItem key={fund.symbol} value={fund.symbol}>
                          {fund.name} ({fund.symbol})
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )}
              {switchData.estimatedValue > 0 && (
                <div className="bg-blue-50 p-3 rounded-lg">
                  <p className="text-sm text-gray-700">
                    <span className="font-medium">Estimated Value:</span> {formatCurrency(switchData.estimatedValue)}
                  </p>
                </div>
              )}
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => {
              setShowSwitchFund(false);
              setSwitchData({ units: "", selectedCompany: "", selectedFund: "", selectedFundSymbol: "", estimatedValue: 0 });
            }}>
              Cancel
            </Button>
            <Button onClick={() => {
              // Determine if it's a switch or convert
              if (selectedHolding) {
                const holdingName = selectedHolding.holding.name.toLowerCase();
                const holdingSymbol = selectedHolding.holding.symbol.toLowerCase();
                const fromCompany = FUND_DATABASE.find(f => 
                  holdingName.includes(f.company.toLowerCase()) ||
                  holdingSymbol.includes(f.symbol.toLowerCase()) ||
                  (holdingName.includes("vanguard") && f.company === "Vanguard") ||
                  (holdingName.includes("ishares") && f.company === "iShares") ||
                  (holdingSymbol.startsWith("vfv") && f.company === "Vanguard") ||
                  (holdingSymbol.startsWith("xic") && f.company === "iShares") ||
                  (holdingSymbol.startsWith("zag") && f.company === "BMO") ||
                  (holdingSymbol.startsWith("vab") && f.company === "Vanguard") ||
                  (holdingSymbol.startsWith("vcn") && f.company === "Vanguard") ||
                  (holdingSymbol.startsWith("xaw") && f.company === "iShares")
                )?.company || "";
                const isSwitch = fromCompany === switchData.selectedCompany;
                setIsConvertMode(!isSwitch);
              }
              
              setShowSwitchConfirmation(true);
              setSwitchConfirmationData({
                fromFund: selectedHolding?.holding.symbol || "",
                toFund: switchData.selectedFundSymbol || "",
                units: parseFloat(switchData.units) || 0,
                estimatedValue: switchData.estimatedValue,
              });
              setShowSwitchFund(false);
            }}>
              Continue
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Switch/Convert Confirmation Dialog */}
      <Dialog open={showSwitchConfirmation} onOpenChange={setShowSwitchConfirmation}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>{isConvertMode ? "Confirm Conversion" : "Confirm Switch"}</DialogTitle>
            <DialogDescription>
              Please review the {isConvertMode ? "conversion" : "switch"} details before confirming.
            </DialogDescription>
          </DialogHeader>
          {switchConfirmationData && (
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">From:</span>
                  <span className="font-medium">{switchConfirmationData.fromFund}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">To:</span>
                  <span className="font-medium">{switchConfirmationData.toFund}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Units:</span>
                  <span className="font-medium">{switchConfirmationData.units.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                </div>
                <div className="flex justify-between text-sm font-semibold pt-2 border-t">
                  <span className="text-gray-700">Estimated Value:</span>
                  <span className="text-blue-600">{formatCurrency(switchConfirmationData.estimatedValue)}</span>
                </div>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => {
              setShowSwitchConfirmation(false);
              setSwitchData({ units: "", selectedCompany: "", selectedFund: "", selectedFundSymbol: "", estimatedValue: 0 });
            }}>
              Cancel
            </Button>
            <Button onClick={() => {
              setShowSwitchConfirmation(false);
              setSwitchData({ units: "", selectedCompany: "", selectedFund: "", selectedFundSymbol: "", estimatedValue: 0 });
              setIsConvertMode(false);
              setSelectedHolding(null);
            }}>
              {isConvertMode ? "Confirm Conversion" : "Confirm Switch"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Buy Units Dialog */}
      <Dialog open={showBuyUnits} onOpenChange={setShowBuyUnits}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Buy More Units</DialogTitle>
            <DialogDescription>
              Purchase additional units of {selectedHolding?.holding.name || "the selected product"}.
            </DialogDescription>
          </DialogHeader>
          {selectedHolding && (
            <div className="space-y-4 py-4">
              <div className="bg-gray-50 p-4 rounded-lg space-y-2">
                <p className="text-sm font-semibold text-gray-700 mb-2">Product Details:</p>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Symbol:</span>
                  <span className="font-medium text-gray-900">{selectedHolding.holding.symbol}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Product:</span>
                  <span className="font-medium text-gray-900">{selectedHolding.holding.name}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Current Price:</span>
                  <span className="font-medium text-gray-900">{formatCurrency(selectedHolding.holding.price)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Current Shares:</span>
                  <span className="font-medium text-gray-900">{selectedHolding.holding.shares.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="buyInvestmentAmount">Investment Amount <span className="text-red-500">*</span></Label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
                  <Input
                    id="buyInvestmentAmount"
                    type="number"
                    value={buyOrderData.investmentAmount}
                    onChange={(e) => {
                      const amount = parseFloat(e.target.value) || 0;
                      const units = amount / selectedHolding.holding.price;
                      setBuyOrderData({
                        ...buyOrderData,
                        investmentAmount: e.target.value,
                        units: units.toFixed(2),
                        estimatedCost: amount,
                        unitsToPurchase: units,
                      });
                    }}
                    placeholder="0.00"
                    className="pl-8"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="buyUnits">Units to Purchase</Label>
                <Input
                  id="buyUnits"
                  type="number"
                  value={buyOrderData.units}
                  onChange={(e) => {
                    const units = parseFloat(e.target.value) || 0;
                    const cost = units * selectedHolding.holding.price;
                    setBuyOrderData({
                      ...buyOrderData,
                      units: e.target.value,
                      investmentAmount: cost.toFixed(2),
                      estimatedCost: cost,
                      unitsToPurchase: units,
                    });
                  }}
                  placeholder="0.00"
                  readOnly
                />
                <p className="text-xs text-gray-500">
                  Calculated based on current price: {formatCurrency(selectedHolding.holding.price)} per unit
                </p>
              </div>
              {buyOrderData.estimatedCost > 0 && (
                <div className="bg-blue-50 p-3 rounded-lg">
                  <p className="text-sm text-gray-700">
                    <span className="font-medium">Estimated Cost:</span> {formatCurrency(buyOrderData.estimatedCost)}
                  </p>
                  <p className="text-xs text-gray-600 mt-1">
                    Units to purchase: {buyOrderData.unitsToPurchase.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </p>
                </div>
              )}
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => {
              setShowBuyUnits(false);
              setBuyOrderData({ investmentAmount: "", units: "", estimatedCost: 0, unitsToPurchase: 0 });
            }}>
              Cancel
            </Button>
            <Button onClick={() => {
              if (selectedHolding && buyOrderData.unitsToPurchase > 0) {
                setOrderConfirmationData({
                  symbol: selectedHolding.holding.symbol,
                  name: selectedHolding.holding.name,
                  units: buyOrderData.unitsToPurchase,
                  price: selectedHolding.holding.price,
                  totalCost: buyOrderData.estimatedCost,
                });
                setShowBuyUnits(false);
                setShowOrderConfirmation(true);
              }
            }}>
              Continue
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Sell Units Dialog */}
      <Dialog open={showSellUnits} onOpenChange={setShowSellUnits}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Sell Units</DialogTitle>
            <DialogDescription>
              Sell units of {selectedHolding?.holding.name || "the selected product"}.
            </DialogDescription>
          </DialogHeader>
          {selectedHolding && (
            <div className="space-y-4 py-4">
              <div className="bg-gray-50 p-4 rounded-lg space-y-2">
                <p className="text-sm font-semibold text-gray-700 mb-2">Product Details:</p>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Symbol:</span>
                  <span className="font-medium text-gray-900">{selectedHolding.holding.symbol}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Product:</span>
                  <span className="font-medium text-gray-900">{selectedHolding.holding.name}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Current Price:</span>
                  <span className="font-medium text-gray-900">{formatCurrency(selectedHolding.holding.price)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Available Shares:</span>
                  <span className="font-medium text-gray-900">{selectedHolding.holding.shares.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="sellUnits">Units to Sell <span className="text-red-500">*</span></Label>
                <Input
                  id="sellUnits"
                  type="number"
                  value={sellOrderData.units}
                  onChange={(e) => {
                    const units = parseFloat(e.target.value) || 0;
                    const proceeds = units * selectedHolding.holding.price;
                    setSellOrderData({
                      ...sellOrderData,
                      units: e.target.value,
                      dollarAmount: proceeds.toFixed(2),
                      estimatedProceeds: proceeds,
                      unitsToSell: units,
                    });
                  }}
                  placeholder="0.00"
                  max={selectedHolding.holding.shares}
                />
                <p className="text-xs text-gray-500">
                  Maximum: {selectedHolding.holding.shares.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} shares
                </p>
              </div>
              <div className="space-y-2">
                <Label htmlFor="sellDollarAmount">Dollar Amount</Label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
                  <Input
                    id="sellDollarAmount"
                    type="number"
                    value={sellOrderData.dollarAmount}
                    onChange={(e) => {
                      const amount = parseFloat(e.target.value) || 0;
                      const units = amount / selectedHolding.holding.price;
                      setSellOrderData({
                        ...sellOrderData,
                        dollarAmount: e.target.value,
                        units: units.toFixed(2),
                        estimatedProceeds: amount,
                        unitsToSell: units,
                      });
                    }}
                    placeholder="0.00"
                    className="pl-8"
                    readOnly
                  />
                </div>
                <p className="text-xs text-gray-500">
                  Calculated based on current price: {formatCurrency(selectedHolding.holding.price)} per unit
                </p>
              </div>
              {sellOrderData.estimatedProceeds > 0 && (
                <div className="bg-blue-50 p-3 rounded-lg">
                  <p className="text-sm text-gray-700">
                    <span className="font-medium">Estimated Proceeds:</span> {formatCurrency(sellOrderData.estimatedProceeds)}
                  </p>
                  <p className="text-xs text-gray-600 mt-1">
                    Units to sell: {sellOrderData.unitsToSell.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </p>
                </div>
              )}
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => {
              setShowSellUnits(false);
              setSellOrderData({ units: "", dollarAmount: "", estimatedProceeds: 0, unitsToSell: 0 });
            }}>
              Cancel
            </Button>
            <Button onClick={() => {
              if (selectedHolding && sellOrderData.unitsToSell > 0) {
                setSellOrderConfirmationData({
                  symbol: selectedHolding.holding.symbol,
                  name: selectedHolding.holding.name,
                  units: sellOrderData.unitsToSell,
                  price: selectedHolding.holding.price,
                  totalProceeds: sellOrderData.estimatedProceeds,
                });
                setShowSellUnits(false);
                setShowSellOrderConfirmation(true);
              }
            }}>
              Continue
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Buy Order Confirmation Dialog */}
      <Dialog open={showOrderConfirmation} onOpenChange={setShowOrderConfirmation}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Confirm Purchase</DialogTitle>
            <DialogDescription>
              Please review the purchase details before confirming.
            </DialogDescription>
          </DialogHeader>
          {orderConfirmationData && (
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Symbol:</span>
                  <span className="font-medium">{orderConfirmationData.symbol}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Product:</span>
                  <span className="font-medium">{orderConfirmationData.name}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Units:</span>
                  <span className="font-medium">{orderConfirmationData.units.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Price per Unit:</span>
                  <span className="font-medium">{formatCurrency(orderConfirmationData.price)}</span>
                </div>
                <div className="flex justify-between text-sm font-semibold pt-2 border-t">
                  <span className="text-gray-700">Total Cost:</span>
                  <span className="text-blue-600">{formatCurrency(orderConfirmationData.totalCost)}</span>
                </div>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => {
              setShowOrderConfirmation(false);
              setOrderConfirmationData(null);
              setBuyOrderData({ investmentAmount: "", units: "", estimatedCost: 0, unitsToPurchase: 0 });
            }}>
              Cancel
            </Button>
            <Button onClick={() => {
              setShowOrderConfirmation(false);
              setOrderConfirmedType("buy");
              setShowOrderConfirmed(true);
            }}>
              Confirm Purchase
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Sell Order Confirmation Dialog */}
      <Dialog open={showSellOrderConfirmation} onOpenChange={setShowSellOrderConfirmation}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Confirm Sale</DialogTitle>
            <DialogDescription>
              Please review the sale details before confirming.
            </DialogDescription>
          </DialogHeader>
          {sellOrderConfirmationData && (
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Symbol:</span>
                  <span className="font-medium">{sellOrderConfirmationData.symbol}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Product:</span>
                  <span className="font-medium">{sellOrderConfirmationData.name}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Units:</span>
                  <span className="font-medium">{sellOrderConfirmationData.units.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Price per Unit:</span>
                  <span className="font-medium">{formatCurrency(sellOrderConfirmationData.price)}</span>
                </div>
                <div className="flex justify-between text-sm font-semibold pt-2 border-t">
                  <span className="text-gray-700">Total Proceeds:</span>
                  <span className="text-green-600">{formatCurrency(sellOrderConfirmationData.totalProceeds)}</span>
                </div>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => {
              setShowSellOrderConfirmation(false);
              setSellOrderConfirmationData(null);
              setSellOrderData({ units: "", dollarAmount: "", estimatedProceeds: 0, unitsToSell: 0 });
            }}>
              Cancel
            </Button>
            <Button onClick={() => {
              setShowSellOrderConfirmation(false);
              setOrderConfirmedType("sell");
              setShowOrderConfirmed(true);
            }}>
              Confirm Sale
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Order Confirmed Dialog */}
      <Dialog open={showOrderConfirmed} onOpenChange={setShowOrderConfirmed}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5 text-green-600" />
              Order Confirmed
            </DialogTitle>
            <DialogDescription>
              Your {orderConfirmedType === "buy" ? "purchase" : "sale"} order has been successfully confirmed.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            {orderConfirmedType === "buy" && orderConfirmationData && (
              <div className="space-y-2">
                <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                  <p className="text-sm font-medium text-green-900 mb-2">Purchase Details:</p>
                  <div className="space-y-1 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Product:</span>
                      <span className="font-medium text-gray-900">{orderConfirmationData.name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Symbol:</span>
                      <span className="font-medium text-gray-900">{orderConfirmationData.symbol}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Units:</span>
                      <span className="font-medium text-gray-900">{orderConfirmationData.units.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                    </div>
                    <div className="flex justify-between pt-2 border-t border-green-200">
                      <span className="text-gray-700 font-medium">Total Cost:</span>
                      <span className="font-semibold text-green-700">{formatCurrency(orderConfirmationData.totalCost)}</span>
                    </div>
                  </div>
                </div>
                <p className="text-xs text-gray-500 text-center">
                  Your order will be processed and reflected in your account shortly.
                </p>
              </div>
            )}
            {orderConfirmedType === "sell" && sellOrderConfirmationData && (
              <div className="space-y-2">
                <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                  <p className="text-sm font-medium text-green-900 mb-2">Sale Details:</p>
                  <div className="space-y-1 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Product:</span>
                      <span className="font-medium text-gray-900">{sellOrderConfirmationData.name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Symbol:</span>
                      <span className="font-medium text-gray-900">{sellOrderConfirmationData.symbol}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Units:</span>
                      <span className="font-medium text-gray-900">{sellOrderConfirmationData.units.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                    </div>
                    <div className="flex justify-between pt-2 border-t border-green-200">
                      <span className="text-gray-700 font-medium">Total Proceeds:</span>
                      <span className="font-semibold text-green-700">{formatCurrency(sellOrderConfirmationData.totalProceeds)}</span>
                    </div>
                  </div>
                </div>
                <p className="text-xs text-gray-500 text-center">
                  Your order will be processed and proceeds will be available shortly.
                </p>
              </div>
            )}
          </div>
          <DialogFooter>
            <Button onClick={() => {
              setShowOrderConfirmed(false);
              setOrderConfirmedType(null);
              setOrderConfirmationData(null);
              setSellOrderConfirmationData(null);
              setBuyOrderData({ investmentAmount: "", units: "", estimatedCost: 0, unitsToPurchase: 0 });
              setSellOrderData({ units: "", dollarAmount: "", estimatedProceeds: 0, unitsToSell: 0 });
              setSelectedHolding(null);
            }}>
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

    </>
  );
}

export default Clients;
