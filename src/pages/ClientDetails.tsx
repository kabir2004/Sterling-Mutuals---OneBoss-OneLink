import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip as RechartsTooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid, AreaChart, Area, LineChart, Line } from "recharts";
import { PageLayout } from "@/components/layout/PageLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Search,
  User,
  DollarSign,
  BarChart3,
  Calendar,
  MapPin,
  Phone,
  TrendingUp,
  ChevronUp,
  ChevronDown,
  FileText,
  AlertCircle,
  AlertTriangle,
  Plus,
  CheckCircle2,
  Clock,
  Minus,
  List,
  Grid3x3,
  ArrowLeftRight,
  X,
  RefreshCw,
  HelpCircle,
  Lightbulb,
  Bell,
  Folder,
  ArrowUpRight,
  Star,
  ThumbsUp,
  ThumbsDown,
  Info,
  Building2,
  Eye,
} from "lucide-react";
import { CLIENTS } from "./Clients";

// Available fund companies
const FUND_COMPANIES = [
  { name: "Fidelity Investments", id: "fidelity", fundsCount: 25 },
  { name: "CIBC Asset Management", id: "cibc", fundsCount: 18 },
  { name: "TD Asset Management", id: "td", fundsCount: 22 },
  { name: "RBC Global Asset Management", id: "rbc", fundsCount: 30 },
  { name: "BMO Asset Management", id: "bmo", fundsCount: 20 },
  { name: "Scotia Asset Management", id: "scotia", fundsCount: 15 },
  { name: "Manulife Investment Management", id: "manulife", fundsCount: 28 },
  { name: "Sun Life Financial", id: "sunlife", fundsCount: 12 },
  { name: "IG Wealth Management", id: "ig", fundsCount: 16 },
  { name: "Mackenzie Investments", id: "mackenzie", fundsCount: 24 },
];

// Mock funds for each company
const COMPANY_FUNDS: { [key: string]: Array<{ name: string; symbol: string; category: string }> } = {
  "Fidelity Investments": [
    { name: "FIDELITY NORTHSTAR FUND Series B ISC", symbol: "FID-253", category: "Equity" },
    { name: "FIDELITY MONTHLY INCOME FUND Series B ISC", symbol: "FID-269", category: "Income" },
    { name: "FIDELITY TRUE NORTH FUND Series B ISC", symbol: "FID-225", category: "Equity" },
    { name: "FIDELITY U.S. FOCUSED STOCK FUND Series B ISC", symbol: "FID-234", category: "Equity" },
    { name: "FIDELITY CANADIAN BALANCED FUND Series B ISC", symbol: "FID-180", category: "Balanced" },
    { name: "FIDELITY GLOBAL EQUITY FUND Series B ISC", symbol: "FID-290", category: "Global" },
    { name: "FIDELITY DIVIDEND FUND Series B ISC", symbol: "FID-201", category: "Equity" },
  ],
  "CIBC Asset Management": [
    { name: "CIBC Canadian Equity Fund - Series A", symbol: "CIBC-CAN", category: "Equity" },
    { name: "CIBC Balanced Fund - Series A", symbol: "CIBC-BAL", category: "Balanced" },
    { name: "CIBC Monthly Income Fund - Series A", symbol: "CIBC-INC", category: "Income" },
    { name: "CIBC Global Equity Fund - Series A", symbol: "CIBC-GLO", category: "Global" },
    { name: "CIBC Dividend Growth Fund - Series A", symbol: "CIBC-DIV", category: "Equity" },
    { name: "CIBC Canadian Bond Fund - Series A", symbol: "CIBC-BND", category: "Fixed Income" },
  ],
  "TD Asset Management": [
    { name: "TD Canadian Equity Fund - Series A", symbol: "TD-CAN", category: "Equity" },
    { name: "TD Balanced Growth Fund - Series A", symbol: "TD-BAL", category: "Balanced" },
    { name: "TD Income Fund - Series A", symbol: "TD-INC", category: "Income" },
    { name: "TD Global Equity Fund - Series A", symbol: "TD-GLO", category: "Global" },
  ],
  "RBC Global Asset Management": [
    { name: "RBC Canadian Equity Fund - Series A", symbol: "RBC-CAN", category: "Equity" },
    { name: "RBC Balanced Portfolio - Series A", symbol: "RBC-BAL", category: "Balanced" },
    { name: "RBC Global Equity Fund - Series A", symbol: "RBC-GLO", category: "Global" },
  ],
  "BMO Asset Management": [
    { name: "BMO Canadian Equity Fund - Series A", symbol: "BMO-CAN", category: "Equity" },
    { name: "BMO Balanced Fund - Series A", symbol: "BMO-BAL", category: "Balanced" },
    { name: "BMO Income Fund - Series A", symbol: "BMO-INC", category: "Income" },
  ],
  "Scotia Asset Management": [
    { name: "Scotia Canadian Equity Fund - Series A", symbol: "SCOTIA-CAN", category: "Equity" },
    { name: "Scotia Balanced Fund - Series A", symbol: "SCOTIA-BAL", category: "Balanced" },
  ],
  "Manulife Investment Management": [
    { name: "Manulife Canadian Equity Fund - Series A", symbol: "MAN-CAN", category: "Equity" },
    { name: "Manulife Balanced Fund - Series A", symbol: "MAN-BAL", category: "Balanced" },
  ],
  "Sun Life Financial": [
    { name: "Sun Life Canadian Equity Fund - Series A", symbol: "SUN-CAN", category: "Equity" },
    { name: "Sun Life Balanced Fund - Series A", symbol: "SUN-BAL", category: "Balanced" },
  ],
  "IG Wealth Management": [
    { name: "IG Canadian Equity Fund - Series A", symbol: "IG-CAN", category: "Equity" },
    { name: "IG Balanced Fund - Series A", symbol: "IG-BAL", category: "Balanced" },
  ],
  "Mackenzie Investments": [
    { name: "Mackenzie Canadian Equity Fund - Series A", symbol: "MACK-CAN", category: "Equity" },
    { name: "Mackenzie Balanced Fund - Series A", symbol: "MACK-BAL", category: "Balanced" },
  ],
};

// Helper function to get the company name from a product
const getProductCompany = (product: any): string => {
  if (!product) return "Fidelity Investments";
  
  const supplier = product.supplier?.toUpperCase() || "";
  const productName = product.product?.toUpperCase() || "";
  
  // Check supplier code
  if (supplier.includes("FID") || productName.includes("FIDELITY")) {
    return "Fidelity Investments";
  }
  if (supplier.includes("CIBC") || productName.includes("CIBC")) {
    return "CIBC Asset Management";
  }
  if (supplier.includes("TD") || productName.includes("TD ")) {
    return "TD Asset Management";
  }
  if (supplier.includes("RBC") || productName.includes("RBC")) {
    return "RBC Global Asset Management";
  }
  if (supplier.includes("BMO") || productName.includes("BMO")) {
    return "BMO Asset Management";
  }
  if (supplier.includes("SCOTIA") || productName.includes("SCOTIA")) {
    return "Scotia Asset Management";
  }
  if (supplier.includes("MANULIFE") || productName.includes("MANULIFE")) {
    return "Manulife Investment Management";
  }
  if (supplier.includes("SUNLIFE") || supplier.includes("SUN LIFE") || productName.includes("SUN LIFE")) {
    return "Sun Life Financial";
  }
  if (supplier.includes("IG") || productName.includes("IG ")) {
    return "IG Wealth Management";
  }
  if (supplier.includes("MACKENZIE") || productName.includes("MACKENZIE")) {
    return "Mackenzie Investments";
  }
  
  // Default to Fidelity if unknown
  return "Fidelity Investments";
};

const ClientDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("investments");
  const [clientViewTab, setClientViewTab] = useState("summary");
  const [searchTerm, setSearchTerm] = useState("");
  const [activeFilter, setActiveFilter] = useState("Active");
  const [viewMode, setViewMode] = useState<"list" | "grid">("list");
  const [expandedPlans, setExpandedPlans] = useState<Set<string>>(new Set(["plan1", "plan2"]));
  const [companySearchTerm, setCompanySearchTerm] = useState("");
  const [fundSearchTerm, setFundSearchTerm] = useState("");
  const [selectedPlanId, setSelectedPlanId] = useState<string | null>(null);
  const [planDetailTab, setPlanDetailTab] = useState("details");
  const [planDetailsSubTab, setPlanDetailsSubTab] = useState("details");
  const [allocationsView, setAllocationsView] = useState<"chart" | "table">("chart");
  const [chartsSubTab, setChartsSubTab] = useState<"smart-charts" | "allocations">("smart-charts");
  const [attachmentsSubTab, setAttachmentsSubTab] = useState<"rep-attachments" | "dealer-attachments" | "statement-history" | "trade-confirmations">("rep-attachments");
  const [includeInactivePlans, setIncludeInactivePlans] = useState(false);
  const [includeInactiveAccounts, setIncludeInactiveAccounts] = useState(false);
  const [accountViewType, setAccountViewType] = useState<"fund-accounts" | "gics">("fund-accounts");
  const [selectedPlanForDetails, setSelectedPlanForDetails] = useState<string | null>("3641343426");
  const [selectedFundAccount, setSelectedFundAccount] = useState<string | null>(null);
  const [fundAccountAllocationsView, setFundAccountAllocationsView] = useState<"chart" | "table">("chart");
  const [transactionsDisplayOption, setTransactionsDisplayOption] = useState("Valid and Pending");
  const [transactionsSortBy, setTransactionsSortBy] = useState("Trade Date");
  const [selectedTransaction, setSelectedTransaction] = useState<string | null>(null);
  const [transactionDetailTab, setTransactionDetailTab] = useState("details");
  const [isDepositDialogOpen, setIsDepositDialogOpen] = useState(false);
  const [depositAmount, setDepositAmount] = useState("0.00");
  const [isBuyUnitsDialogOpen, setIsBuyUnitsDialogOpen] = useState(false);
  const [isOrderConfirmedDialogOpen, setIsOrderConfirmedDialogOpen] = useState(false);
  const [isSellUnitsDialogOpen, setIsSellUnitsDialogOpen] = useState(false);
  const [isSellOrderConfirmedDialogOpen, setIsSellOrderConfirmedDialogOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [selectedPlan, setSelectedPlan] = useState<any>(null);
  const [investmentAmount, setInvestmentAmount] = useState("200");
  const [numberOfUnits, setNumberOfUnits] = useState("");
  const [sellUnits, setSellUnits] = useState("200");
  const [sellDollarAmount, setSellDollarAmount] = useState("");
  const [orderDetails, setOrderDetails] = useState<any>(null);
  const [sellOrderDetails, setSellOrderDetails] = useState<any>(null);
  const [isSwitchDialogOpen, setIsSwitchDialogOpen] = useState(false);
  const [isConvertDialogOpen, setIsConvertDialogOpen] = useState(false);
  const [isSwitchOrderConfirmedDialogOpen, setIsSwitchOrderConfirmedDialogOpen] = useState(false);
  const [isConvertOrderConfirmedDialogOpen, setIsConvertOrderConfirmedDialogOpen] = useState(false);
  const [selectedFundCompany, setSelectedFundCompany] = useState("");
  const [selectedFundToSwitch, setSelectedFundToSwitch] = useState("");
  const [unitsToSwitch, setUnitsToSwitch] = useState("");
  const [switchOrderDetails, setSwitchOrderDetails] = useState<any>(null);
  const [convertOrderDetails, setConvertOrderDetails] = useState<any>(null);
  const [isSelectPlanTypeOpen, setIsSelectPlanTypeOpen] = useState(false);
  const [selectedPlanType, setSelectedPlanType] = useState("");
  const [planSetupStep, setPlanSetupStep] = useState(0);
  const [ownerName, setOwnerName] = useState("John Smith");
  const [beneficiaryName, setBeneficiaryName] = useState("");
  const [intermediaryCode, setIntermediaryCode] = useState("");
  const [intermediaryAccountCode, setIntermediaryAccountCode] = useState("");
  const [planNotes, setPlanNotes] = useState("");
  const [planObjectives, setPlanObjectives] = useState("");
  const [riskTolerance, setRiskTolerance] = useState("");
  const [timeHorizon, setTimeHorizon] = useState("");
  const [createdPlanDetails, setCreatedPlanDetails] = useState<any>(null);
  const [isAddProductOpen, setIsAddProductOpen] = useState(false);
  const [addProductFundCompany, setAddProductFundCompany] = useState("");
  const [addProductFundSearch, setAddProductFundSearch] = useState("");
  const [addProductSelectedFund, setAddProductSelectedFund] = useState("");
  const [addProductAmount, setAddProductAmount] = useState("");
  const [isInvestmentOrderConfirmedOpen, setIsInvestmentOrderConfirmedOpen] = useState(false);
  const [investmentOrderDetails, setInvestmentOrderDetails] = useState<any>(null);
  const [isStandaloneAddProductOpen, setIsStandaloneAddProductOpen] = useState(false);
  const [standaloneFundCompany, setStandaloneFundCompany] = useState("");
  const [standaloneFundSearch, setStandaloneFundSearch] = useState("");
  const [standaloneSelectedFund, setStandaloneSelectedFund] = useState("");
  const [standaloneAmount, setStandaloneAmount] = useState("");
  const [portfolioSubTab, setPortfolioSubTab] = useState<"investments" | "cash" | "recent-trading" | "product-documents">("investments");
  const [collapsedAccounts, setCollapsedAccounts] = useState<Set<string>>(new Set());
  
  // Plans data for the Plans tab
  const plansList = [
    {
      id: "3641343426",
      type: "RRSP",
      accountNumber: "3641343426",
      name: "Client Name",
      category: "Individual",
      marketValue: "$16,305.20",
    },
    {
      id: "1234567890",
      type: "RESP",
      accountNumber: "1234567890",
      name: "Client Name",
      category: "Individual",
      marketValue: "$12,500.00",
    },
  ];
  
  // Get selected plan data for details
  const selectedPlanData = plansList.find(p => p.id === selectedPlanForDetails) || plansList[0];
  
  // Fund account data
  const fundAccounts = [
    {
      id: "CIG-7710",
      productCode: "CIG-11112",
      accountNumber: "5160230205",
      fullName: "CIG-7710 5160230205 (LM) CI Portfolio Series Balanced Fund A ISC FEL CAD",
      productName: "11112 CI Canadian Dividend Fund A ISC",
      supplier: "CIG",
      risk: "M",
      investmentObjective: "25% In, 75% Gr",
      rateType: "FEL",
      dscRate: "0.0%",
      felMaxRate: "5.0%",
      currentPrice: "$31.7434",
      priceDate: "04/29/2025",
      category: "Canadian Dividend & Income Equity",
      distributionOption: "Reinvest",
      startDate: "11/01/2024",
      endDate: "",
      totalSharesIssued: "0.0000",
      totalSharesUnissued: "4.6920",
      certificate: "No Certificate",
      active: true,
      lastSequence: "3784",
      effectiveDate: "04/25/2025",
      excludeFromDuplicate: false,
      marketValue: "$2,315.88 CAD",
    },
    {
      id: "CIG-7715",
      productCode: "CIG-11112",
      accountNumber: "5525887488",
      fullName: "CIG-7715 5525887488 (LM) CI Portfolio Series Balanced Fund A DSC DSC CAD",
      productName: "11112 CI Canadian Dividend Fund A ISC",
      supplier: "CIG",
      risk: "M",
      investmentObjective: "25% In, 75% Gr",
      rateType: "DSC",
      dscRate: "5.0%",
      felMaxRate: "0.0%",
      currentPrice: "$31.7434",
      priceDate: "04/29/2025",
      category: "Canadian Dividend & Income Equity",
      distributionOption: "Reinvest",
      startDate: "11/01/2024",
      endDate: "",
      totalSharesIssued: "0.0000",
      totalSharesUnissued: "4.6920",
      certificate: "No Certificate",
      active: true,
      lastSequence: "3784",
      effectiveDate: "04/25/2025",
      excludeFromDuplicate: false,
      marketValue: "$13,989.32 CAD",
    },
  ];
  
  // Get selected fund account data
  const selectedFundAccountData = fundAccounts.find(f => f.id === selectedFundAccount) || null;
  
  // Transaction data for selected fund account
  const transactions = selectedFundAccount ? [
    { id: "1", date: "04/25/2025", grossAmount: "$0.82", netAmount: "$0.82", price: "$12.5499", status: "Valid", type: "Reinvested Distribution", shareBalance: "11.8280" },
    { id: "2", date: "02/21/2025", grossAmount: "$25.00", netAmount: "$25.00", price: "$12.5499", status: "Valid", type: "Purchase PAC", shareBalance: "10.8280" },
    { id: "3", date: "01/21/2025", grossAmount: "$25.00", netAmount: "$25.00", price: "$12.5499", status: "Valid", type: "Purchase PAC", shareBalance: "8.8280" },
    { id: "4", date: "12/20/2024", grossAmount: "$0.69", netAmount: "$0.69", price: "$12.5499", status: "Valid", type: "Reinvested Distribution", shareBalance: "6.8280" },
    { id: "5", date: "11/20/2024", grossAmount: "$25.00", netAmount: "$25.00", price: "$12.5499", status: "Valid", type: "Purchase PAC", shareBalance: "4.8280" },
    { id: "6", date: "10/20/2024", grossAmount: "$0.56", netAmount: "$0.56", price: "$12.5499", status: "Valid", type: "Reinvested Distribution", shareBalance: "2.8280" },
    { id: "7", date: "09/20/2024", grossAmount: "$0.42", netAmount: "$0.42", price: "$12.5499", status: "Valid", type: "Reinvested Distribution", shareBalance: "0.8280" },
    { id: "8", date: "08/20/2024", grossAmount: "$0.27", netAmount: "$0.27", price: "$12.5499", status: "Valid", type: "Reinvested Distribution", shareBalance: "0.0000" },
  ] : [];
  
  // Get selected transaction data
  const selectedTransactionData = transactions.find(t => t.id === selectedTransaction) || null;

  // Find the client by ID
  const client = CLIENTS.find((c) => c.id === id);

  if (!client) {
    return (
      <PageLayout title="">
        <div className="text-center py-12">
          <p className="text-gray-500">Client not found</p>
          <Button onClick={() => navigate("/clients")} className="mt-4">
            Back to Clients
          </Button>
        </div>
      </PageLayout>
    );
  }

  // Mock data for the client details
  const clientDetails = {
    totalAssets: "$354.94",
    totalTrades: 45,
    joinDate: "2024-01-15",
    mailingAddress: {
      line1: "123 Main Street",
      line2: "Suite 200",
      line3: "TORONTO ON M5H 2N2",
    },
    contact: {
      home: "555-555-5555",
      cell: "555-555-5555",
      email: "client@onebosstest.com",
    },
    representative: {
      name: "Marsh, Antoine",
      id: "9823-2232",
      language: "English",
    },
    plans: [
      {
        id: "plan1",
        type: "DCPP",
        shortType: "DCPP",
        account: "5434273615",
        category: "Individual",
        holder: "Client Name",
        risk: "Medium",
        objective: "Growth",
        marketValue: "$180.53",
        accountDesignation: "Broker/Nominee",
        badgeColor: "bg-blue-100 text-blue-700",
        products: [
          {
            supplier: "FID-253",
            account: "3448232822",
            product: "FIDELITY NORTHSTAR FUND Series B ISC",
            objective: "Speculation",
            units: "1,247.32 Units",
            price: "$9.41 Per Unit",
            netInvested: "$10,000.00",
            marketValue: "$11,734.85",
            marketValueChange: "+$0.35 (0.003%)",
            marketValueChangePositive: true,
            bookValue: "$11,734.50",
          },
          {
            supplier: "FID-269",
            account: "6503857600",
            product: "FIDELITY MONTHLY INCOME FUND Series B ISC",
            objective: "Balanced",
            units: "2,789.44 Units",
            price: "$10.85 Per Unit",
            netInvested: "$25,000.00",
            marketValue: "$30,265.27",
            marketValueChange: "-$0.25 (-0.001%)",
            marketValueChangePositive: false,
            bookValue: "$30,265.52",
          },
        ],
        totals: {
          netInvested: "$35,000.00",
          totalMarketValue: "$82,905.00",
          totalBookValue: "$42,000.02",
        },
      },
      {
        id: "plan2",
        type: "TFSA",
        shortType: "TFSA",
        account: "TFSA-984512",
        category: "Individual Plan",
        holder: "Smith, John",
        risk: "Medium",
        objective: "Growth",
        marketValue: "$107,325.00",
        accountDesignation: "Broker/Nominee",
        badgeColor: "bg-green-100 text-green-700",
        products: [
          {
            supplier: "FID-253",
            account: "3448232822",
            product: "FIDELITY NORTHSTAR FUND Series B ISC",
            objective: "Speculation",
            units: "1,247.32 Units",
            price: "$9.41 Per Unit",
            netInvested: "$10,000.00",
            marketValue: "$11,734.85",
            marketValueChange: "+$0.35 (0.003%)",
            marketValueChangePositive: true,
            bookValue: "$11,734.50",
          },
        ],
        totals: {
          netInvested: "$10,000.00",
          totalMarketValue: "$107,325.00",
          totalBookValue: "$11,734.50",
        },
      },
      {
        id: "plan3",
        type: "Non-Registered",
        shortType: "Non-Registered",
        account: "NR-984512",
        category: "Individual Plan",
        holder: "Smith, John",
        risk: "Medium",
        objective: "Growth",
        marketValue: "$73,650.00",
        accountDesignation: "Broker/Nominee",
        badgeColor: "bg-purple-100 text-purple-700",
        products: [],
        totals: {
          netInvested: "$0.00",
          totalMarketValue: "$73,650.00",
          totalBookValue: "$0.00",
        },
      },
      {
        id: "plan4",
        type: "RESP Education Savings Plan",
        shortType: "RESP",
        account: "3238677748",
        category: "Family Plan",
        holder: "Smith, John",
        risk: "Medium",
        objective: "Speculation",
        marketValue: "$65,120.00",
        accountDesignation: "Broker/Nominee",
        badgeColor: "bg-yellow-100 text-yellow-700",
        products: [
          {
            supplier: "FID-253",
            account: "3448232822",
            product: "FIDELITY NORTHSTAR FUND Series B ISC",
            objective: "Speculation",
            units: "1,247.32 Units",
            price: "$9.41 Per Unit",
            netInvested: "$10,000.00",
            marketValue: "$11,734.85",
            marketValueChange: "+$0.35 (0.003%)",
            marketValueChangePositive: true,
            bookValue: "$11,734.50",
          },
        ],
        totals: {
          netInvested: "$10,000.00",
          totalMarketValue: "$65,120.00",
          totalBookValue: "$11,734.50",
        },
      },
    ],
  };

  const togglePlanExpansion = (planId: string) => {
    const newExpanded = new Set(expandedPlans);
    if (newExpanded.has(planId)) {
      newExpanded.delete(planId);
    } else {
      newExpanded.add(planId);
    }
    setExpandedPlans(newExpanded);
  };

  // Count clients by status (for filters)
  const activeCount = CLIENTS.filter((c) => c.status === "Active").length;
  const inactiveCount = CLIENTS.filter((c) => c.status === "Inactive").length;
  const prospectsCount = CLIENTS.filter((c) => c.status === "Prospect").length;

  return (
    <PageLayout title="">
      <div className="space-y-6">
        {/* Client Name and Account */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Client: {client.name.split(" ").reverse().join(", ")}</h1>
            <p className="text-sm text-gray-600 mt-1">Account {client.id}</p>
          </div>
          <Button
            variant="ghost"
            size="sm"
            className="h-8 w-8 p-0"
            onClick={() => navigate("/clients")}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>

        {/* Client View Navigation Tabs */}
        <div className="flex items-center gap-2 border-b border-gray-200 pb-2">
          <Button
            variant={clientViewTab === "summary" ? "default" : "ghost"}
            className={clientViewTab === "summary" ? "bg-blue-600 text-white hover:bg-blue-700" : "text-gray-700 hover:bg-gray-100"}
            onClick={() => setClientViewTab("summary")}
          >
            Summary
          </Button>
          <Button
            variant={clientViewTab === "about" ? "default" : "ghost"}
            className={clientViewTab === "about" ? "bg-blue-600 text-white hover:bg-blue-700" : "text-gray-700 hover:bg-gray-100"}
            onClick={() => setClientViewTab("about")}
          >
            About
          </Button>
          <Button
            variant={clientViewTab === "notes" ? "default" : "ghost"}
            className={clientViewTab === "notes" ? "bg-blue-600 text-white hover:bg-blue-700" : "text-gray-700 hover:bg-gray-100"}
            onClick={() => setClientViewTab("notes")}
          >
            Notes
          </Button>
          <Button
            variant={clientViewTab === "portfolio" ? "default" : "ghost"}
            className={clientViewTab === "portfolio" ? "bg-blue-600 text-white hover:bg-blue-700" : "text-gray-700 hover:bg-gray-100"}
            onClick={() => setClientViewTab("portfolio")}
          >
            Plans
          </Button>
          <Button
            variant={clientViewTab === "trading" ? "default" : "ghost"}
            className={clientViewTab === "trading" ? "bg-blue-600 text-white hover:bg-blue-700" : "text-gray-700 hover:bg-gray-100"}
            onClick={() => setClientViewTab("trading")}
          >
            Trading
            <HelpCircle className="h-3 w-3 ml-1" />
          </Button>
          <Button
            variant={clientViewTab === "questionnaires" ? "default" : "ghost"}
            className={clientViewTab === "questionnaires" ? "bg-blue-600 text-white hover:bg-blue-700" : "text-gray-700 hover:bg-gray-100"}
            onClick={() => setClientViewTab("questionnaires")}
          >
            Questionnaires
            <HelpCircle className="h-3 w-3 ml-1" />
          </Button>
          <Button
            variant={clientViewTab === "client-reports" ? "default" : "ghost"}
            className={clientViewTab === "client-reports" ? "bg-blue-600 text-white hover:bg-blue-700" : "text-gray-700 hover:bg-gray-100"}
            onClick={() => setClientViewTab("client-reports")}
          >
            Client Reports
            <HelpCircle className="h-3 w-3 ml-1" />
          </Button>
          <Button
            variant={clientViewTab === "charts" ? "default" : "ghost"}
            className={clientViewTab === "charts" ? "bg-blue-600 text-white hover:bg-blue-700" : "text-gray-700 hover:bg-gray-100"}
            onClick={() => setClientViewTab("charts")}
          >
            Charts
            <HelpCircle className="h-3 w-3 ml-1" />
          </Button>
          <Button
            variant={clientViewTab === "approvals" ? "default" : "ghost"}
            className={clientViewTab === "approvals" ? "bg-blue-600 text-white hover:bg-blue-700" : "text-gray-700 hover:bg-gray-100"}
            onClick={() => setClientViewTab("approvals")}
          >
            Approvals
          </Button>
          <Button
            variant={clientViewTab === "attachments" ? "default" : "ghost"}
            className={clientViewTab === "attachments" ? "bg-blue-600 text-white hover:bg-blue-700" : "text-gray-700 hover:bg-gray-100"}
            onClick={() => setClientViewTab("attachments")}
          >
            Attachments
          </Button>
        </div>


        {/* Content based on selected tab */}
        {clientViewTab === "summary" && (
          <>
            {/* Information Cards */}
        <div className="grid grid-cols-6 gap-4">
          {/* Residential Address Card */}
          <Card className="border border-gray-200 shadow-sm bg-white group">
            <CardHeader className="pb-3 relative">
              <CardTitle className="text-sm font-semibold text-gray-900">Residential Address</CardTitle>
              {clientDetails.mailingAddress && (
                <Tooltip>
                  <TooltipTrigger asChild>
                    <span className="absolute top-3 right-3 text-blue-600 opacity-0 group-hover:opacity-100 transition-opacity cursor-help text-xs font-semibold">*</span>
                  </TooltipTrigger>
                  <TooltipContent>
                    <div className="space-y-1">
                      <p className="font-semibold">Mailing Address:</p>
                      <p>{clientDetails.mailingAddress.line1}</p>
                      {clientDetails.mailingAddress.line2 && <p>{clientDetails.mailingAddress.line2}</p>}
                      {clientDetails.mailingAddress.line3 && <p>{clientDetails.mailingAddress.line3}</p>}
                    </div>
                  </TooltipContent>
                </Tooltip>
              )}
            </CardHeader>
            <CardContent className="pt-0">
              <p className="text-sm text-gray-700">{clientDetails.mailingAddress.line1}</p>
              <p className="text-sm text-gray-700">{clientDetails.mailingAddress.line2}</p>
              <p className="text-sm text-gray-700 mt-2">Home: {clientDetails.contact.home}</p>
              <p className="text-sm text-gray-700">Cell: {clientDetails.contact.cell}</p>
            </CardContent>
          </Card>

          {/* Email Address Card */}
          <Card className="border border-gray-200 shadow-sm bg-white">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-semibold text-gray-900">Email Address</CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <p className="text-sm text-gray-700">{clientDetails.contact.email}</p>
            </CardContent>
          </Card>

          {/* Client and Plan Exceptions Card */}
          <Card className="border border-gray-200 shadow-sm bg-white">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-semibold text-gray-900">Client and Plan Exceptions</CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <p className="text-sm text-gray-500">No exceptions</p>
            </CardContent>
          </Card>

          {/* Client Profiler Card */}
          <Card className="border border-gray-200 shadow-sm bg-white">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-semibold text-gray-900">Client Profiler</CardTitle>
            </CardHeader>
            <CardContent className="pt-0 space-y-3">
              {/* Retention Score */}
              <div>
                <div className="text-xs text-gray-600 mb-1">Retention Score</div>
                <div className="text-sm font-semibold text-green-600 mb-1">36.37</div>
                <div className="h-1 rounded-full bg-gray-100">
                  <div className="h-full rounded-full bg-green-500" style={{ width: '86.37%' }}></div>
                </div>
              </div>

              {/* Engagement Score */}
              <div>
                <div className="text-xs text-gray-600 mb-1">Engagement Score</div>
                <div className="text-sm font-semibold text-gray-900 mb-1">N/A</div>
                <div className="h-1 rounded-full bg-gray-200"></div>
              </div>
            </CardContent>
          </Card>

          {/* Current Representative Card */}
          <Card className="border border-gray-200 shadow-sm bg-white">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-semibold text-gray-900">Current Representative</CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <p className="text-sm text-gray-700">{clientDetails.representative.name}</p>
              <p className="text-sm font-semibold text-gray-900 mt-2 mb-1">Client Preferred Language</p>
              <p className="text-sm text-gray-700">{clientDetails.representative.language}</p>
            </CardContent>
          </Card>

          {/* Total Assets Card */}
          <Card className="border border-gray-200 shadow-sm bg-white">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-semibold text-gray-900">Total Assets</CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <p className="text-sm font-bold text-green-600">{clientDetails.totalAssets}</p>
            </CardContent>
          </Card>
        </div>

        {/* Financial Portfolio Section */}
        <Card className="border border-gray-200 shadow-sm">
          <CardContent className="pt-3 pb-3">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="flex w-full mb-2 h-8 bg-transparent p-0 gap-1">
                <TabsTrigger value="investments" className="text-[10px] px-2 py-1.5 flex-1 whitespace-nowrap min-w-0">
                  Investments
                </TabsTrigger>
                <TabsTrigger value="cash" className="text-[10px] px-2 py-1.5 flex-1 whitespace-nowrap min-w-0">
                  Cash
                </TabsTrigger>
                <TabsTrigger value="trading-activity" className="text-[10px] px-2 py-1.5 flex-1 whitespace-nowrap min-w-0">
                  Recent Trading Activity
                </TabsTrigger>
                <TabsTrigger value="documents" className="text-[10px] px-2 py-1.5 flex-1 relative whitespace-nowrap min-w-0">
                  Documents
                  <span className="absolute top-0 right-0 h-1.5 w-1.5 bg-orange-500 rounded-full"></span>
                </TabsTrigger>
              </TabsList>

              <TabsContent value="investments" className="space-y-2 mt-2">
                {/* Joint Investment Account Section */}
                <div className="border border-gray-300 rounded">
                  <div className="bg-white text-gray-900 px-3 py-1.5 flex items-center justify-between border-b border-gray-200">
                    <div className="flex items-center gap-1.5 flex-1">
                      <Folder className="h-3 w-3" />
                      <div className="flex-1">
                        <p className="text-xs">
                          <span className="underline cursor-pointer">340009</span> (OPEN Broker/Nominee, Joint) NOM 340009 - 9823-2232 <span className="underline cursor-pointer">Marsh, Antoine</span>
                        </p>
                        <div className="mt-0.5 px-1.5 py-0.5">
                          <p className="text-[10px] text-gray-700">Joint with <span className="underline cursor-pointer">Armstrong, Oliver</span> (Primary)</p>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <BarChart3 className="h-3 w-3 cursor-pointer text-gray-700" />
                      <div className="bg-green-600 p-0.5 rounded">
                        <DollarSign className="h-3 w-3 text-white" />
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-5 w-5 p-0 text-gray-700 hover:bg-gray-100"
                        onClick={() => {
                          const newCollapsed = new Set(collapsedAccounts);
                          if (newCollapsed.has("account1")) {
                            newCollapsed.delete("account1");
                          } else {
                            newCollapsed.add("account1");
                          }
                          setCollapsedAccounts(newCollapsed);
                        }}
                      >
                        <Minus className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                  {!collapsedAccounts.has("account1") && (
                    <div className="p-2">
                      {/* Investment Details Table */}
                      <Table>
                        <TableHeader>
                          <TableRow className="bg-gray-100">
                            <TableHead className="text-[10px] font-semibold text-gray-700 py-1.5 px-2">Supplier</TableHead>
                            <TableHead className="text-[10px] font-semibold text-gray-700 py-1.5 px-2">Account</TableHead>
                            <TableHead className="text-[10px] font-semibold text-gray-700 py-1.5 px-2">Product</TableHead>
                            <TableHead className="text-[10px] font-semibold text-gray-700 py-1.5 px-2">Risk</TableHead>
                            <TableHead className="text-[10px] font-semibold text-gray-700 py-1.5 px-2">Objective</TableHead>
                            <TableHead className="text-[10px] font-semibold text-gray-700 py-1.5 px-2">Market value</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          <TableRow 
                            className="cursor-pointer hover:bg-gray-50"
                            onClick={() => setClientViewTab("portfolio")}
                          >
                            <TableCell className="text-xs py-1.5 px-2">
                              <span className="font-bold text-blue-600 underline cursor-pointer">AGF-185</span>
                            </TableCell>
                            <TableCell className="text-xs py-1.5 px-2"></TableCell>
                            <TableCell className="text-xs py-1.5 px-2">AGF CANADIAN DIVIDEND INCOME FUND SERIES F</TableCell>
                            <TableCell className="text-xs py-1.5 px-2">M</TableCell>
                            <TableCell className="text-xs py-1.5 px-2">
                              <div className="flex flex-col gap-0.5">
                                <span>100% Gr</span>
                                <div className="flex items-center gap-0.5">
                                  <FileText className="h-2.5 w-2.5 text-blue-600" />
                                  <Folder className="h-2.5 w-2.5 text-red-600" />
                                  <Lightbulb className="h-2.5 w-2.5 text-yellow-600" />
                                </div>
                              </div>
                            </TableCell>
                            <TableCell className="text-xs font-semibold py-1.5 px-2">$0.00</TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>
                      {/* Settled Trust Account Balance */}
                      <div className="bg-blue-50 mt-2 p-2 rounded">
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-xs text-gray-700">Settled Trust Account Balance CAD</span>
                          <span className="text-xs font-semibold">$0.00</span>
                        </div>
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-xs text-gray-700">Settled Trust Account Balance USD</span>
                          <span className="text-xs font-semibold">$0.00</span>
                        </div>
                        <div className="flex justify-between items-center pt-1 border-t border-blue-200">
                          <span className="text-xs font-semibold text-gray-900">Total in CAD</span>
                          <span className="text-xs font-bold">$0.00</span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* RRIF Client Account Section */}
                <div className="border border-gray-300 rounded">
                  <div className="bg-white text-gray-900 px-3 py-1.5 flex items-center justify-between border-b border-gray-200">
                    <div className="flex items-center gap-1.5 flex-1">
                      <Folder className="h-3 w-3" />
                      <p className="text-xs">
                        <span className="underline cursor-pointer">0137617685</span> (RRIF Client Name, Individual) - 9823-2232 <span className="underline cursor-pointer">Marsh, Antoine</span>
                      </p>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <BarChart3 className="h-3 w-3 cursor-pointer text-gray-700" />
                      <div className="bg-green-600 p-0.5 rounded">
                        <DollarSign className="h-3 w-3 text-white" />
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-5 w-5 p-0 text-gray-700 hover:bg-gray-100"
                        onClick={() => {
                          const newCollapsed = new Set(collapsedAccounts);
                          if (newCollapsed.has("account2")) {
                            newCollapsed.delete("account2");
                          } else {
                            newCollapsed.add("account2");
                          }
                          setCollapsedAccounts(newCollapsed);
                        }}
                      >
                        <Minus className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                  {!collapsedAccounts.has("account2") && (
                    <div className="p-2">
                      {/* Investment Details Table */}
                      <Table>
                        <TableHeader>
                          <TableRow className="bg-gray-100">
                            <TableHead className="text-[10px] font-semibold text-gray-700 py-1.5 px-2">Supplier</TableHead>
                            <TableHead className="text-[10px] font-semibold text-gray-700 py-1.5 px-2">Account</TableHead>
                            <TableHead className="text-[10px] font-semibold text-gray-700 py-1.5 px-2">Product</TableHead>
                            <TableHead className="text-[10px] font-semibold text-gray-700 py-1.5 px-2">Risk</TableHead>
                            <TableHead className="text-[10px] font-semibold text-gray-700 py-1.5 px-2">Objective</TableHead>
                            <TableHead className="text-[10px] font-semibold text-gray-700 py-1.5 px-2">Market value</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          <TableRow 
                            className="bg-blue-50 cursor-pointer hover:bg-blue-100"
                            onClick={() => setClientViewTab("portfolio")}
                          >
                            <TableCell className="text-xs py-1.5 px-2">
                              <span className="font-bold text-blue-600 underline cursor-pointer">MFC-724</span>
                            </TableCell>
                            <TableCell className="text-xs py-1.5 px-2">4132056511</TableCell>
                            <TableCell className="text-xs py-1.5 px-2">MACKENZIE BLUEWATER CANADIAN GROWTH BALANCED FUND A FE</TableCell>
                            <TableCell className="text-xs py-1.5 px-2">LM</TableCell>
                            <TableCell className="text-xs py-1.5 px-2">
                              <div className="flex flex-col gap-0.5">
                                <span>25% In, 75% Gr</span>
                                <div className="flex items-center gap-0.5">
                                  <FileText className="h-2.5 w-2.5 text-blue-600" />
                                  <Folder className="h-2.5 w-2.5 text-red-600" />
                                  <Lightbulb className="h-2.5 w-2.5 text-yellow-600" />
                                </div>
                              </div>
                            </TableCell>
                            <TableCell className="text-xs font-semibold py-1.5 px-2">
                              <div className="flex flex-col gap-0.5">
                                <span>$13,792.63</span>
                                <TrendingUp className="h-2.5 w-2.5 text-gray-600" />
                              </div>
                            </TableCell>
                          </TableRow>
                          <TableRow 
                            className="cursor-pointer hover:bg-gray-50"
                            onClick={() => setClientViewTab("portfolio")}
                          >
                            <TableCell className="text-xs py-1.5 px-2">
                              <span className="font-bold text-blue-600 underline cursor-pointer">MFC-2238</span>
                            </TableCell>
                            <TableCell className="text-xs py-1.5 px-2">1134475341</TableCell>
                            <TableCell className="text-xs py-1.5 px-2">MACKENZIE STRATEGIC INCOME FUND A FE</TableCell>
                            <TableCell className="text-xs py-1.5 px-2">LM</TableCell>
                            <TableCell className="text-xs py-1.5 px-2">
                              <div className="flex flex-col gap-0.5">
                                <span>50% In, 50% Gr</span>
                                <div className="flex items-center gap-0.5">
                                  <FileText className="h-2.5 w-2.5 text-blue-600" />
                                  <Folder className="h-2.5 w-2.5 text-red-600" />
                                  <Lightbulb className="h-2.5 w-2.5 text-yellow-600" />
                                </div>
                              </div>
                            </TableCell>
                            <TableCell className="text-xs font-semibold py-1.5 px-2">
                              <div className="flex flex-col gap-0.5">
                                <span>$9,718.53</span>
                                <TrendingUp className="h-2.5 w-2.5 text-gray-600" />
                              </div>
                            </TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>
                      {/* Settled Trust Account Balance */}
                      <div className="bg-blue-50 mt-2 p-2 rounded">
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-xs text-gray-700">Settled Trust Account Balance CAD</span>
                          <span className="text-xs font-semibold">$0.00</span>
                        </div>
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-xs text-gray-700">Settled Trust Account Balance USD</span>
                          <span className="text-xs font-semibold">$0.00</span>
                        </div>
                        <div className="flex justify-between items-center pt-1 border-t border-blue-200">
                          <span className="text-xs font-semibold text-gray-900">Total in CAD</span>
                          <span className="text-xs font-bold">$23,511.16</span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </TabsContent>

              <TabsContent value="cash">
                <div className="space-y-4">
                  {/* Cash Summary Section */}
                  <div className="grid grid-cols-2 gap-4">
                    {/* Left Column - CAD */}
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-gray-700">Cash Available CAD</span>
                        <span className="flex-1 border-b border-dotted border-gray-400"></span>
                        <span className="text-xs text-gray-900">$0.00</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-gray-700">Cash Used For Trades CAD</span>
                        <span className="flex-1 border-b border-dotted border-gray-400"></span>
                        <span className="text-xs text-gray-900">$0.00</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-gray-700">Cash Total CAD</span>
                        <span className="flex-1 border-b border-dotted border-gray-400"></span>
                        <span className="text-xs text-gray-900">$0.00</span>
                      </div>
                    </div>
                    {/* Right Column - USD */}
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-gray-700">Cash Available USD</span>
                        <span className="flex-1 border-b border-dotted border-gray-400"></span>
                        <span className="text-xs text-gray-900">$0.00</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-gray-700">Cash Used For Trades USD</span>
                        <span className="flex-1 border-b border-dotted border-gray-400"></span>
                        <span className="text-xs text-gray-900">$0.00</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-gray-700">Cash Total USD</span>
                        <span className="flex-1 border-b border-dotted border-gray-400"></span>
                        <span className="text-xs text-gray-900">$0.00</span>
                      </div>
                    </div>
                  </div>

                  {/* Recent Trust Transactions Section */}
                  <div className="mt-4">
                    <h3 className="text-xs font-semibold text-blue-600 underline mb-2 cursor-pointer">Recent Trust Transactions</h3>
                    <Card className="border border-gray-200 shadow-sm">
                      <CardContent className="p-0">
                        <Table>
                          <TableHeader>
                            <TableRow className="bg-gray-100">
                              <TableHead className="text-[10px] font-semibold text-gray-700 py-1.5 px-2">Plan</TableHead>
                              <TableHead className="text-[10px] font-semibold text-gray-700 py-1.5 px-2">Date</TableHead>
                              <TableHead className="text-[10px] font-semibold text-gray-700 py-1.5 px-2">Trust Account Code</TableHead>
                              <TableHead className="text-[10px] font-semibold text-gray-700 py-1.5 px-2">Transaction Type</TableHead>
                              <TableHead className="text-[10px] font-semibold text-gray-700 py-1.5 px-2">Status</TableHead>
                              <TableHead className="text-[10px] font-semibold text-gray-700 py-1.5 px-2">Settled Date</TableHead>
                              <TableHead className="text-[10px] font-semibold text-gray-700 py-1.5 px-2">Amount</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            <TableRow>
                              <TableCell colSpan={7} className="text-center py-4">
                                <p className="text-xs text-gray-500 italic">No Trust Transactions Found</p>
                              </TableCell>
                            </TableRow>
                          </TableBody>
                        </Table>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="trading-activity">
                <Card className="border border-gray-200 shadow-sm">
                  <CardContent className="p-0">
                    <Table>
                      <TableHeader>
                        <TableRow className="bg-gray-100">
                          <TableHead className="text-[10px] font-semibold text-gray-700 py-1.5 px-2">Plan</TableHead>
                          <TableHead className="text-[10px] font-semibold text-gray-700 py-1.5 px-2">Fund Account</TableHead>
                          <TableHead className="text-[10px] font-semibold text-gray-700 py-1.5 px-2">Trade Type</TableHead>
                          <TableHead className="text-[10px] font-semibold text-gray-700 py-1.5 px-2">Trade Status</TableHead>
                          <TableHead className="text-[10px] font-semibold text-gray-700 py-1.5 px-2">Net Amount</TableHead>
                          <TableHead className="text-[10px] font-semibold text-gray-700 py-1.5 px-2">Trade Date</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        <TableRow>
                          <TableCell colSpan={6} className="text-center py-4">
                            <p className="text-xs text-gray-500 italic">No Trading Activities Found</p>
                          </TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="documents">
                <div className="space-y-4">
                  {/* Product Documents Header */}
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 flex items-center gap-2">
                    <h3 className="text-sm font-semibold text-gray-900 flex items-center gap-2">
                      Product Documents for Active Products
                      <AlertTriangle className="h-4 w-4 text-orange-500" />
                    </h3>
                  </div>

                  {/* Documents Table */}
                  <Card className="border border-gray-200 shadow-sm">
                    <CardContent className="p-0">
                      <Table>
                        <TableHeader>
                          <TableRow className="bg-gray-50">
                            <TableHead className="text-xs font-semibold text-gray-700">Security</TableHead>
                            <TableHead className="text-xs font-semibold text-gray-700">Document Type</TableHead>
                            <TableHead className="text-xs font-semibold text-gray-700">Delivery Type</TableHead>
                            <TableHead className="text-xs font-semibold text-gray-700">Delivery Date</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          <TableRow className="hover:bg-gray-50">
                            <TableCell>
                              <div className="flex items-start gap-2">
                                <Checkbox className="mt-1" />
                                <div className="text-xs text-gray-900">
                                  <p className="font-medium">FID-225 FIDELITY TRUE NORTH FUND</p>
                                  <p className="text-gray-600">SERIES B ISC</p>
                                </div>
                              </div>
                            </TableCell>
                            <TableCell>
                              <Select defaultValue="fund-facts">
                                <SelectTrigger className="h-8 text-xs w-[140px]">
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="fund-facts">Fund Facts</SelectItem>
                                  <SelectItem value="prospectus">Prospectus</SelectItem>
                                  <SelectItem value="annual-report">Annual Report</SelectItem>
                                </SelectContent>
                              </Select>
                            </TableCell>
                            <TableCell className="text-xs text-gray-700">Downloaded</TableCell>
                            <TableCell>
                              <div className="flex items-center gap-2">
                                <span className="text-xs text-gray-700">02-12-2025 02:02 PM</span>
                                <AlertTriangle className="h-3 w-3 text-orange-500" />
                              </div>
                            </TableCell>
                          </TableRow>
                          <TableRow className="hover:bg-gray-50">
                            <TableCell>
                              <div className="flex items-start gap-2">
                                <Checkbox className="mt-1" />
                                <div className="text-xs text-gray-900">
                                  <p className="font-medium">FID-234 FIDELITY U.S. FOCUSED STOCK FUND</p>
                                  <p className="text-gray-600">SERIES B ISC</p>
                                </div>
                              </div>
                            </TableCell>
                            <TableCell>
                              <Select defaultValue="fund-facts">
                                <SelectTrigger className="h-8 text-xs w-[140px]">
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="fund-facts">Fund Facts</SelectItem>
                                  <SelectItem value="prospectus">Prospectus</SelectItem>
                                  <SelectItem value="annual-report">Annual Report</SelectItem>
                                </SelectContent>
                              </Select>
                            </TableCell>
                            <TableCell className="text-xs text-gray-700">Downloaded</TableCell>
                            <TableCell>
                              <div className="flex items-center gap-2">
                                <span className="text-xs text-gray-700">02-12-2025 02:02 PM</span>
                                <AlertTriangle className="h-3 w-3 text-orange-500" />
                              </div>
                            </TableCell>
                          </TableRow>
                          <TableRow className="hover:bg-gray-50">
                            <TableCell>
                              <div className="flex items-start gap-2">
                                <Checkbox className="mt-1" />
                                <div className="text-xs text-gray-900">
                                  <p className="font-medium">FID-253 FIDELITY NORTHSTAR FUND</p>
                                  <p className="text-gray-600">SERIES B ISC</p>
                                </div>
                              </div>
                            </TableCell>
                            <TableCell>
                              <Select defaultValue="fund-facts">
                                <SelectTrigger className="h-8 text-xs w-[140px]">
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="fund-facts">Fund Facts</SelectItem>
                                  <SelectItem value="prospectus">Prospectus</SelectItem>
                                  <SelectItem value="annual-report">Annual Report</SelectItem>
                                </SelectContent>
                              </Select>
                            </TableCell>
                            <TableCell className="text-xs text-gray-700">Downloaded</TableCell>
                            <TableCell>
                              <div className="flex items-center gap-2">
                                <span className="text-xs text-gray-700">02-12-2025 02:02 PM</span>
                                <AlertTriangle className="h-3 w-3 text-orange-500" />
                              </div>
                            </TableCell>
                          </TableRow>
                          <TableRow className="hover:bg-gray-50">
                            <TableCell>
                              <div className="flex items-start gap-2">
                                <Checkbox className="mt-1" />
                                <div className="text-xs text-gray-900">
                                  <p className="font-medium">FID-269 FIDELITY MONTHLY INCOME FUND</p>
                                  <p className="text-gray-600">SERIES B ISC</p>
                                </div>
                              </div>
                            </TableCell>
                            <TableCell>
                              <Select defaultValue="fund-facts">
                                <SelectTrigger className="h-8 text-xs w-[140px]">
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="fund-facts">Fund Facts</SelectItem>
                                  <SelectItem value="prospectus">Prospectus</SelectItem>
                                  <SelectItem value="annual-report">Annual Report</SelectItem>
                                </SelectContent>
                              </Select>
                            </TableCell>
                            <TableCell className="text-xs text-gray-700">Downloaded</TableCell>
                            <TableCell>
                              <div className="flex items-center gap-2">
                                <span className="text-xs text-gray-700">02-12-2025 02:02 PM</span>
                                <AlertTriangle className="h-3 w-3 text-orange-500" />
                              </div>
                            </TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>
                    </CardContent>
                  </Card>

                  {/* Bottom Action Bar */}
                  <div className="flex items-center gap-4 pt-2">
                    <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                      Deliver
                    </Button>
                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-2">
                        <Checkbox defaultChecked id="lang-en" />
                        <label htmlFor="lang-en" className="text-xs text-gray-700 cursor-pointer">EN</label>
                      </div>
                      <div className="flex items-center gap-2">
                        <Checkbox id="lang-fr" />
                        <label htmlFor="lang-fr" className="text-xs text-gray-700 cursor-pointer">FR</label>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <label className="text-xs text-gray-700">Select Delivery Method</label>
                      <Select defaultValue="email">
                        <SelectTrigger className="h-8 text-xs w-[180px]">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="email">Email</SelectItem>
                          <SelectItem value="mail">Mail</SelectItem>
                          <SelectItem value="download">Download</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
          </>
        )}

        {clientViewTab === "about" && (
          <ScrollArea className="h-[calc(100vh-300px)] pr-4 bg-gray-50">
            <div className="space-y-6 p-4">
            {/* Action Buttons */}
            <div className="flex items-center gap-2 flex-wrap">
              <Button 
                className="bg-green-600 hover:bg-green-700 text-white"
                onClick={() => {
                  // Handle Save Client Details
                }}
              >
                Save Client Details
              </Button>
              <Button 
                variant="default"
                className="bg-blue-600 hover:bg-blue-700 text-white"
                onClick={() => {
                  // Handle Cancel
                }}
              >
                Cancel
              </Button>
              <Button 
                variant="default"
                className="bg-blue-600 hover:bg-blue-700 text-white"
                onClick={() => {
                  // Handle Non Financial Change
                }}
              >
                Non Financial Change
              </Button>
              <Button 
                variant="default"
                className="bg-blue-600 hover:bg-blue-700 text-white"
                onClick={() => {
                  // Handle View NFC Submissions
                }}
              >
                View NFC Submissions
              </Button>
              <Button 
                variant="default"
                className="bg-blue-600 hover:bg-blue-700 text-white"
                onClick={() => {
                  // Handle View NFU Messages
                }}
              >
                View NFU Messages
              </Button>
              <Button 
                variant="default"
                className="bg-blue-600 hover:bg-blue-700 text-white"
                onClick={() => {
                  // Handle Start KYP Review
                }}
              >
                Start KYP Review
              </Button>
            </div>
            
            {/* Two Column Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Left Column */}
              <div className="space-y-6">
                {/* Personal Information */}
                <div className="bg-white p-4 rounded border border-gray-200">
                  <h3 className="text-sm font-semibold text-gray-900 mb-2 pb-2 border-b-2 border-blue-600">Personal Information</h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                  <div>
                    <Label className="text-xs text-gray-500 mb-1 block">ID</Label>
                    <Input className="h-8 text-sm" defaultValue="30013" readOnly />
                  </div>
                  <div>
                    <Label className="text-xs text-gray-500 mb-1 block">Title</Label>
                    <Select defaultValue="mr">
                      <SelectTrigger className="h-8 text-sm">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="mr">Mr.</SelectItem>
                        <SelectItem value="mrs">Mrs.</SelectItem>
                        <SelectItem value="ms">Ms.</SelectItem>
                        <SelectItem value="dr">Dr.</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label className="text-xs text-gray-500 mb-1 block">Type</Label>
                    <Select defaultValue="individual">
                      <SelectTrigger className="h-8 text-sm">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="individual">Individual</SelectItem>
                        <SelectItem value="joint">Joint</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label className="text-xs text-gray-500 mb-1 block">First Name</Label>
                    <Input className="h-8 text-sm" defaultValue="Toney" />
                  </div>
                  <div>
                    <Label className="text-xs text-gray-500 mb-1 block">Surname</Label>
                    <Input className="h-8 text-sm" defaultValue="Andrews" />
                  </div>
                  <div>
                    <Label className="text-xs text-gray-500 mb-1 block">Alias</Label>
                    <Input className="h-8 text-sm" />
                  </div>
                  <div>
                    <Label className="text-xs text-gray-500 mb-1 block">Gender</Label>
                    <Select defaultValue="male">
                      <SelectTrigger className="h-8 text-sm">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="male">Male</SelectItem>
                        <SelectItem value="female">Female</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label className="text-xs text-gray-500 mb-1 block">Marital Status</Label>
                    <div className="flex items-center gap-2">
                      <Select defaultValue="none">
                        <SelectTrigger className="h-8 text-sm">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="single">Single</SelectItem>
                          <SelectItem value="married">Married</SelectItem>
                          <SelectItem value="divorced">Divorced</SelectItem>
                          <SelectItem value="widowed">Widowed</SelectItem>
                          <SelectItem value="none">None</SelectItem>
                        </SelectContent>
                      </Select>
                      <AlertTriangle className="h-4 w-4 text-orange-500" />
                    </div>
                  </div>
                  <div>
                    <Label className="text-xs text-gray-500 mb-1 block">Dependants</Label>
                    <Select defaultValue="0">
                      <SelectTrigger className="h-8 text-sm">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="0">0</SelectItem>
                        <SelectItem value="1">1</SelectItem>
                        <SelectItem value="2">2</SelectItem>
                        <SelectItem value="3">3</SelectItem>
                        <SelectItem value="4+">4+</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label className="text-xs text-gray-500 mb-1 block">Date of Birth</Label>
                    <div className="flex items-center gap-2">
                      <Input className="h-8 text-sm" defaultValue="11/06/1960" />
                      <Calendar className="h-4 w-4 text-gray-500" />
                    </div>
                  </div>
                  <div>
                    <Label className="text-xs text-gray-500 mb-1 block">Age</Label>
                    <Input className="h-8 text-sm" defaultValue="65" readOnly />
                  </div>
                  <div>
                    <Label className="text-xs text-gray-500 mb-1 block">Language</Label>
                    <Select defaultValue="english">
                      <SelectTrigger className="h-8 text-sm">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="english">English</SelectItem>
                        <SelectItem value="french">French</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label className="text-xs text-gray-500 mb-1 block">SIN</Label>
                    <Input className="h-8 text-sm" defaultValue="912174828" />
                  </div>
                  <div>
                    <Label className="text-xs text-gray-500 mb-1 block">CDIC Client Identifier</Label>
                    <Input className="h-8 text-sm" defaultValue="OBW1K0" />
                  </div>
                  <div>
                    <Label className="text-xs text-gray-500 mb-1 block">File ID</Label>
                    <Input className="h-8 text-sm" />
                  </div>
                  <div>
                    <Label className="text-xs text-gray-500 mb-1 block">Delivery Status</Label>
                    <Select defaultValue="estatements">
                      <SelectTrigger className="h-8 text-sm">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="estatements">eStatements</SelectItem>
                        <SelectItem value="mail">Mail</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label className="text-xs text-gray-500 mb-1 block">Delivery Status Consent Date</Label>
                    <div className="flex items-center gap-2">
                      <Input className="h-8 text-sm" defaultValue="03/21/2017" />
                      <Calendar className="h-4 w-4 text-gray-500" />
                    </div>
                  </div>
                  <div>
                    <Label className="text-xs text-gray-500 mb-1 block">Status</Label>
                    <Select defaultValue="active">
                      <SelectTrigger className="h-8 text-sm">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="active">Active</SelectItem>
                        <SelectItem value="inactive">Inactive</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label className="text-xs text-gray-500 mb-1 block">LTA Date</Label>
                    <div className="flex items-center gap-2">
                      <Input className="h-8 text-sm" />
                      <Calendar className="h-4 w-4 text-gray-500" />
                    </div>
                  </div>
                  <div>
                    <Label className="text-xs text-gray-500 mb-1 block">LTA</Label>
                    <div className="flex items-center gap-2">
                      <Checkbox id="lta" />
                      <Input className="h-8 text-sm flex-1" />
                    </div>
                  </div>
                  <div>
                    <Label className="text-xs text-gray-500 mb-1 block">POA Date</Label>
                    <div className="flex items-center gap-2">
                      <Input className="h-8 text-sm" />
                      <Calendar className="h-4 w-4 text-gray-500" />
                    </div>
                  </div>
                  <div>
                    <Label className="text-xs text-gray-500 mb-1 block">POA</Label>
                    <div className="flex items-center gap-2">
                      <Checkbox id="poa" />
                      <Input className="h-8 text-sm flex-1" />
                    </div>
                  </div>
                  <div>
                    <Label className="text-xs text-gray-500 mb-1 block">POA Name</Label>
                    <Input className="h-8 text-sm" />
                  </div>
                  <div>
                    <Label className="text-xs text-gray-500 mb-1 block">POA Address</Label>
                    <Input className="h-8 text-sm" />
                  </div>
                  <div>
                    <Label className="text-xs text-gray-500 mb-1 block">Tax Code</Label>
                    <Input className="h-8 text-sm" defaultValue="ONTARIO" />
                  </div>
                  <div>
                    <Label className="text-xs text-gray-500 mb-1 block">Citizenship</Label>
                    <Select defaultValue="unknown">
                      <SelectTrigger className="h-8 text-sm">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="canadian">Canadian</SelectItem>
                        <SelectItem value="us">US</SelectItem>
                        <SelectItem value="unknown">Unknown</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label className="text-xs text-gray-500 mb-1 block">Pro Account</Label>
                    <Select>
                      <SelectTrigger className="h-8 text-sm">
                        <SelectValue placeholder="Select" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="yes">Yes</SelectItem>
                        <SelectItem value="no">No</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label className="text-xs text-gray-500 mb-1 block">Pro Account Date</Label>
                    <div className="flex items-center gap-2">
                      <Input className="h-8 text-sm" />
                      <Calendar className="h-4 w-4 text-gray-500" />
                    </div>
                  </div>
                  <div>
                    <Label className="text-xs text-gray-500 mb-1 block">Representative Defined Field 1</Label>
                    <Input className="h-8 text-sm" />
                  </div>
                  <div>
                    <Label className="text-xs text-gray-500 mb-1 block">Representative Defined Field 2</Label>
                    <Input className="h-8 text-sm" defaultValue="3" />
                  </div>
                  <div>
                    <Label className="text-xs text-gray-500 mb-1 block">Representative Defined Field 3</Label>
                    <Input className="h-8 text-sm" />
                  </div>
                  <div>
                    <Label className="text-xs text-gray-500 mb-1 block">Date of Death</Label>
                    <div className="flex items-center gap-2">
                      <Input className="h-8 text-sm" />
                      <Calendar className="h-4 w-4 text-gray-500" />
                    </div>
                  </div>
                  <div>
                    <Label className="text-xs text-gray-500 mb-1 block">CASL Permission (consents to receive emails)</Label>
                    <Checkbox id="casl" />
                  </div>
                </div>
                </div>

                {/* Spouse Residential Address */}
                <div className="bg-white p-4 rounded border border-gray-200">
                  <h3 className="text-sm font-semibold text-gray-900 mb-2 pb-2 border-b-2 border-blue-600">Spouse Residential Address</h3>
                  <div className="grid grid-cols-2 gap-4 mt-4">
                    <div className="flex items-center gap-2">
                      <Checkbox id="spouse-residential-same" />
                      <Label htmlFor="spouse-residential-same" className="text-xs text-gray-700 cursor-pointer">Same as Client Residential Address</Label>
                    </div>
                    <div>
                      <Label className="text-xs text-gray-500 mb-1 block">Address Line 1</Label>
                      <Input className="h-8 text-sm" />
                    </div>
                    <div>
                      <Label className="text-xs text-gray-500 mb-1 block">Address Line 2</Label>
                      <Input className="h-8 text-sm" />
                    </div>
                    <div>
                      <Label className="text-xs text-gray-500 mb-1 block">City</Label>
                      <Input className="h-8 text-sm" />
                    </div>
                    <div>
                      <Label className="text-xs text-gray-500 mb-1 block">Country</Label>
                      <Select defaultValue="canada">
                        <SelectTrigger className="h-8 text-sm">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="canada">Canada</SelectItem>
                          <SelectItem value="usa">United States</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label className="text-xs text-gray-500 mb-1 block">Province</Label>
                      <Select>
                        <SelectTrigger className="h-8 text-sm">
                          <SelectValue placeholder="Select province" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="on">Ontario</SelectItem>
                          <SelectItem value="bc">British Columbia</SelectItem>
                          <SelectItem value="ab">Alberta</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label className="text-xs text-gray-500 mb-1 block">Postal</Label>
                      <Input className="h-8 text-sm" />
                    </div>
                  </div>
                </div>

                {/* Spouse Mailing Address */}
                <div className="bg-white p-4 rounded border border-gray-200">
                  <h3 className="text-sm font-semibold text-gray-900 mb-2 pb-2 border-b-2 border-blue-600">Spouse Mailing Address</h3>
                  <div className="grid grid-cols-2 gap-4 mt-4">
                    <div className="flex items-center gap-2">
                      <Checkbox id="spouse-mailing-same" />
                      <Label htmlFor="spouse-mailing-same" className="text-xs text-gray-700 cursor-pointer">Same as residential</Label>
                    </div>
                    <div>
                      <Label className="text-xs text-gray-500 mb-1 block">Address Line 1</Label>
                      <Input className="h-8 text-sm" />
                    </div>
                    <div>
                      <Label className="text-xs text-gray-500 mb-1 block">Address Line 2</Label>
                      <Input className="h-8 text-sm" />
                    </div>
                    <div>
                      <Label className="text-xs text-gray-500 mb-1 block">City</Label>
                      <Input className="h-8 text-sm" />
                    </div>
                    <div>
                      <Label className="text-xs text-gray-500 mb-1 block">Country</Label>
                      <Select defaultValue="unknown">
                        <SelectTrigger className="h-8 text-sm">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="canada">Canada</SelectItem>
                          <SelectItem value="usa">United States</SelectItem>
                          <SelectItem value="unknown">Unknown</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label className="text-xs text-gray-500 mb-1 block">Province</Label>
                      <Select>
                        <SelectTrigger className="h-8 text-sm">
                          <SelectValue placeholder="Select province" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="on">Ontario</SelectItem>
                          <SelectItem value="bc">British Columbia</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label className="text-xs text-gray-500 mb-1 block">Postal</Label>
                      <Input className="h-8 text-sm" />
                    </div>
                  </div>
                </div>
              </div>
              {/* Right Column */}
              <div className="space-y-6">
            {/* Contact Information */}
            <div className="bg-white p-4 rounded border border-gray-200">
              <h3 className="text-sm font-semibold text-gray-900 mb-2 pb-2 border-b-2 border-blue-600">Contact Information</h3>
              <div className="mt-4 space-y-4">
                {/* Returned Mail */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-xs text-gray-500 mb-1 block">Returned Mail</Label>
                    <Select defaultValue="no">
                      <SelectTrigger className="h-8 text-sm">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="yes">Yes</SelectItem>
                        <SelectItem value="no">No</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label className="text-xs text-gray-500 mb-1 block">Returned Mail Date</Label>
                    <div className="flex items-center gap-2">
                      <Input className="h-8 text-sm" />
                      <Calendar className="h-4 w-4 text-gray-500" />
                    </div>
                  </div>
                </div>
                {/* Mobility Exemption */}
                <div>
                  <Label className="text-xs text-gray-500 mb-1 block">Mobility Exemption</Label>
                  <p className="text-xs text-gray-700">No Mobility Exemptions</p>
                </div>
                {/* Residential Address */}
                <div>
                  <Label className="text-xs font-semibold text-gray-900 mb-2 block">Residential Address</Label>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label className="text-xs text-gray-500 mb-1 block">Address Line 1</Label>
                      <Input className="h-8 text-sm" defaultValue="3460 Keele Street Apt. 502" />
                    </div>
                    <div>
                      <Label className="text-xs text-gray-500 mb-1 block">Address Line 2</Label>
                      <Input className="h-8 text-sm" />
                    </div>
                    <div>
                      <Label className="text-xs text-gray-500 mb-1 block">City</Label>
                      <Input className="h-8 text-sm" defaultValue="Toronto" />
                    </div>
                    <div>
                      <Label className="text-xs text-gray-500 mb-1 block">Country</Label>
                      <Select defaultValue="canada">
                        <SelectTrigger className="h-8 text-sm">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="canada">Canada</SelectItem>
                          <SelectItem value="usa">United States</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label className="text-xs text-gray-500 mb-1 block">Province</Label>
                      <Select defaultValue="ontario">
                        <SelectTrigger className="h-8 text-sm">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="ontario">ONTARIO</SelectItem>
                          <SelectItem value="bc">British Columbia</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label className="text-xs text-gray-500 mb-1 block">Postal</Label>
                      <Input className="h-8 text-sm" defaultValue="HOH OHO" />
                    </div>
                    <div>
                      <Label className="text-xs text-gray-500 mb-1 block">Home</Label>
                      <Input className="h-8 text-sm" defaultValue="555-555-5555" />
                    </div>
                    <div>
                      <Label className="text-xs text-gray-500 mb-1 block">Cell</Label>
                      <Input className="h-8 text-sm" defaultValue="555-555-5555" />
                    </div>
                  </div>
                </div>
                {/* Mailing Address */}
                <div>
                  <Label className="text-xs font-semibold text-gray-900 mb-2 block">Mailing Address</Label>
                  <div className="flex items-center gap-2 mb-2">
                    <Checkbox id="mailing-same" defaultChecked />
                    <Label htmlFor="mailing-same" className="text-xs text-gray-700 cursor-pointer">Same as residential</Label>
                  </div>
                </div>
                {/* Phone and Email */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-xs text-gray-500 mb-1 block">Home Phone</Label>
                    <Input className="h-8 text-sm" defaultValue="555-555-5555" />
                  </div>
                  <div>
                    <Label className="text-xs text-gray-500 mb-1 block">Work Phone</Label>
                    <Input className="h-8 text-sm" defaultValue="555-555-5555" />
                  </div>
                  <div>
                    <Label className="text-xs text-gray-500 mb-1 block">Cell Phone</Label>
                    <Input className="h-8 text-sm" defaultValue="555-555-5555" />
                  </div>
                  <div>
                    <Label className="text-xs text-gray-500 mb-1 block">Fax</Label>
                    <Input className="h-8 text-sm" defaultValue="000-000-0000" />
                  </div>
                  <div>
                    <Label className="text-xs text-gray-500 mb-1 block">Email</Label>
                    <Input className="h-8 text-sm" defaultValue="client@onebosstest.com" />
                  </div>
                  <div>
                    <Label className="text-xs text-gray-500 mb-1 block">Verify Email</Label>
                    <Input className="h-8 text-sm" />
                  </div>
                  <div>
                    <Label className="text-xs text-gray-500 mb-1 block">Email (Secondary)</Label>
                    <Input className="h-8 text-sm" defaultValue="client30013@onebosstest.com" />
                  </div>
                  <div>
                    <Label className="text-xs text-gray-500 mb-1 block">Verify Secondary Email</Label>
                    <Input className="h-8 text-sm" />
                  </div>
                </div>
                {/* Reset Client Web Access Buttons */}
                <div className="space-y-2 pt-2 border-t border-gray-200">
                  <Button variant="outline" size="sm" className="bg-blue-600 hover:bg-blue-700 text-white w-full">
                    View Client Portal as {client.name.split(" ").reverse().join(", ")}
                  </Button>
                  <Button variant="outline" size="sm" className="bg-blue-600 hover:bg-blue-700 text-white w-full">
                    Reset Client Web Access
                  </Button>
                  <Button variant="outline" size="sm" className="bg-blue-600 hover:bg-blue-700 text-white w-full">
                    View Portal Login History
                  </Button>
                </div>
                {/* Permissions */}
                <div className="pt-2 border-t border-gray-200">
                  <div className="flex items-center gap-2 mb-2">
                    <Checkbox id="fund-alerts" />
                    <Label htmlFor="fund-alerts" className="text-xs text-gray-700 cursor-pointer">
                      Client may access Fund Alerts
                    </Label>
                  </div>
                  <Button variant="outline" size="sm" className="bg-blue-600 hover:bg-blue-700 text-white">
                    Apply Permissions
                  </Button>
                </div>
              </div>
            </div>


            {/* Employment Information */}
            <div className="bg-white p-4 rounded border border-gray-200">
              <h3 className="text-sm font-semibold text-gray-900 mb-2 pb-2 border-b-2 border-blue-600">Employment Information</h3>
              <div className="mt-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-xs text-gray-500 mb-1 block">Occupation</Label>
                    <Input className="h-8 text-sm" defaultValue="Records Managment" />
                  </div>
                  <div>
                    <Label className="text-xs text-gray-500 mb-1 block">Employer</Label>
                    <Input className="h-8 text-sm" defaultValue="City of Mississauga" />
                  </div>
                </div>
              </div>
            </div>

            {/* Bank Account Information */}
            <div className="bg-white p-4 rounded border border-gray-200">
              <div className="flex items-center justify-between mb-2 pb-2 border-b-2 border-blue-600">
                <h3 className="text-sm font-semibold text-gray-900">Bank Account Information</h3>
                <Button variant="outline" size="sm" className="bg-blue-600 hover:bg-blue-700 text-white">
                  <Plus className="h-4 w-4 mr-2" />
                  Add New Bank Account
                </Button>
              </div>
              <div className="mt-4">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-gray-50">
                      <TableHead className="text-xs font-semibold text-gray-700">Description</TableHead>
                      <TableHead className="text-xs font-semibold text-gray-700">Transit Number</TableHead>
                      <TableHead className="text-xs font-semibold text-gray-700">Institution Number</TableHead>
                      <TableHead className="text-xs font-semibold text-gray-700">Account Number</TableHead>
                      <TableHead className="text-xs font-semibold text-gray-700">Holder Name</TableHead>
                      <TableHead className="text-xs font-semibold text-gray-700">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell className="text-xs text-gray-900">Demo bank account 62110</TableCell>
                      <TableCell className="text-xs text-gray-700">001</TableCell>
                      <TableCell className="text-xs text-gray-700">0167132</TableCell>
                      <TableCell className="text-xs text-gray-700"></TableCell>
                      <TableCell className="text-xs text-gray-700">Toney Andrews</TableCell>
                      <TableCell>
                        <Button variant="ghost" size="sm" className="h-6 text-xs bg-blue-600 hover:bg-blue-700 text-white">
                          <FileText className="h-3 w-3 mr-1" />
                          Edit
                        </Button>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
            </div>

            {/* Personal KYC Information */}
            <div className="bg-white p-4 rounded border border-gray-200">
              <h3 className="text-sm font-semibold text-gray-900 mb-2 pb-2 border-b-2 border-blue-600">Personal KYC Information</h3>
              <div className="mt-4">
                <div className="grid grid-cols-2 gap-4">
                  {/* Left Column */}
                  <div className="space-y-4">
                    <div>
                      <Label className="text-xs text-gray-500 mb-1 block">Liquid Assets</Label>
                      <Input className="h-8 text-sm" defaultValue="$0.00" />
                    </div>
                    <div>
                      <Label className="text-xs text-gray-500 mb-1 block">Fixed Assets</Label>
                      <Input className="h-8 text-sm" defaultValue="$35,000.00" />
                    </div>
                    <div>
                      <Label className="text-xs text-gray-500 mb-1 block">Liabilities</Label>
                      <Input className="h-8 text-sm" defaultValue="$0.00" />
                    </div>
                    <div className="flex items-center gap-2">
                      <Label className="text-xs text-gray-500">Total</Label>
                      <Input className="h-8 text-sm flex-1" defaultValue="$35,000.00" readOnly />
                      <Button variant="outline" size="sm" className="bg-blue-600 hover:bg-blue-700 text-white">
                        Calculate
                      </Button>
                    </div>
                    <div className="flex items-center gap-2">
                      <Checkbox id="assets-includes-spouse" />
                      <Label htmlFor="assets-includes-spouse" className="text-xs text-gray-700 cursor-pointer">
                        Assets Includes Spouse
                      </Label>
                    </div>
                  </div>
                  {/* Right Column */}
                  <div className="space-y-4">
                    <div>
                      <Label className="text-xs text-gray-500 mb-1 block">Personal Income</Label>
                      <Input className="h-8 text-sm" defaultValue="$0.00" />
                    </div>
                    <div>
                      <Label className="text-xs text-gray-500 mb-1 block">Personal Income</Label>
                      <Select defaultValue="25000-49999">
                        <SelectTrigger className="h-8 text-sm">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="0-24999">$0 - $24,999</SelectItem>
                          <SelectItem value="25000-49999">$25,000 - $49,999</SelectItem>
                          <SelectItem value="50000-99999">$50,000 - $99,999</SelectItem>
                          <SelectItem value="100000+">$100,000+</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="flex items-center gap-2">
                      <Checkbox id="income-includes-spouse" />
                      <Label htmlFor="income-includes-spouse" className="text-xs text-gray-700 cursor-pointer">
                        Income Includes Spouse
                      </Label>
                    </div>
                    <div>
                      <Label className="text-xs text-gray-500 mb-1 block">Investor Knowledge</Label>
                      <Select defaultValue="fair">
                        <SelectTrigger className="h-8 text-sm">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="novice">Novice</SelectItem>
                          <SelectItem value="fair">Fair</SelectItem>
                          <SelectItem value="intermediate">Intermediate</SelectItem>
                          <SelectItem value="advanced">Advanced</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label className="text-xs text-gray-500 mb-1 block">Accredited Investor</Label>
                      <Select defaultValue="no">
                        <SelectTrigger className="h-8 text-sm">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="yes">Yes</SelectItem>
                          <SelectItem value="no">No</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Politically Exposed Person Information */}
            <div className="bg-white p-4 rounded border border-gray-200">
              <h3 className="text-sm font-semibold text-gray-900 mb-2 pb-2 border-b-2 border-blue-600">Politically Exposed Person Information</h3>
              <div className="mt-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Label className="text-xs text-gray-700">Politically exposed person?</Label>
                    <Select defaultValue="unknown">
                      <SelectTrigger className="h-8 text-sm w-[120px]">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="yes">Yes</SelectItem>
                        <SelectItem value="no">No</SelectItem>
                        <SelectItem value="unknown">Unknown</SelectItem>
                      </SelectContent>
                    </Select>
                    <AlertTriangle className="h-4 w-4 text-orange-500" />
                  </div>
                  <p className="text-xs text-gray-500 italic">Client or family member</p>
                </div>
              </div>
            </div>

            {/* FATCA/CRS Information */}
            <div className="bg-white p-4 rounded border border-gray-200">
              <h3 className="text-sm font-semibold text-gray-900 mb-2 pb-2 border-b-2 border-blue-600">FATCA/CRS Information</h3>
              <div className="mt-4 space-y-4">
                <div className="flex items-center gap-2">
                  <Label className="text-xs text-gray-700">Tax resident of a jurisdiction other than Canada*</Label>
                  <Select defaultValue="yes">
                    <SelectTrigger className="h-8 text-sm w-[120px]">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="yes">Yes</SelectItem>
                      <SelectItem value="no">No</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label className="text-xs text-gray-500 mb-1 block">FATCA Eligible</Label>
                  <Select defaultValue="reportable">
                    <SelectTrigger className="h-8 text-sm">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="reportable">Reportable</SelectItem>
                      <SelectItem value="non-reportable">Non Reportable</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label className="text-xs text-gray-500 mb-1 block">SSN</Label>
                  <Input className="h-8 text-sm" />
                </div>
                <div>
                  <Label className="text-xs text-gray-500 mb-1 block">FATCA No TIN Reason</Label>
                  <div className="flex items-center gap-2">
                    <Select defaultValue="none">
                      <SelectTrigger className="h-8 text-sm">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="none">None</SelectItem>
                      </SelectContent>
                    </Select>
                    <AlertTriangle className="h-4 w-4 text-orange-500" />
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Checkbox id="w8ben" />
                  <Label htmlFor="w8ben" className="text-xs text-gray-700 cursor-pointer">W-8BEN/W9</Label>
                </div>
                <div>
                  <Label className="text-xs text-gray-500 mb-1 block">W-8BEN/W9 Date</Label>
                  <div className="flex items-center gap-2">
                    <Input className="h-8 text-sm" />
                    <Calendar className="h-4 w-4 text-gray-500" />
                  </div>
                </div>
                <div>
                  <Label className="text-xs text-gray-500 mb-1 block">CRS Eligible</Label>
                  <Select defaultValue="non-reportable">
                    <SelectTrigger className="h-8 text-sm">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="reportable">Reportable</SelectItem>
                      <SelectItem value="non-reportable">Non Reportable</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            {/* ID Documents */}
            <div className="bg-white p-4 rounded border border-gray-200">
              <div className="flex items-center justify-between mb-2 pb-2 border-b-2 border-blue-600">
                <h3 className="text-sm font-semibold text-gray-900">ID Documents</h3>
                <Button variant="outline" size="sm" className="bg-blue-600 hover:bg-blue-700 text-white">
                  <Plus className="h-4 w-4 mr-2" />
                  Add New ID Document
                </Button>
              </div>
              <div className="mt-4">
                <div className="mb-4">
                  <Label className="text-xs font-semibold text-gray-900 mb-2 block">Identification Methods</Label>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="flex items-center gap-2">
                      <Checkbox id="id-in-person" defaultChecked />
                      <Label htmlFor="id-in-person" className="text-xs text-gray-700 cursor-pointer">In Person</Label>
                    </div>
                    <div className="flex items-center gap-2">
                      <Checkbox id="id-video" />
                      <Label htmlFor="id-video" className="text-xs text-gray-700 cursor-pointer">Video Conference</Label>
                    </div>
                    <div className="flex items-center gap-2">
                      <Checkbox id="id-agent" />
                      <Label htmlFor="id-agent" className="text-xs text-gray-700 cursor-pointer">By Agent</Label>
                    </div>
                    <div className="flex items-center gap-2">
                      <Checkbox id="id-affiliate" />
                      <Label htmlFor="id-affiliate" className="text-xs text-gray-700 cursor-pointer">By Affiliate</Label>
                    </div>
                    <div className="flex items-center gap-2">
                      <Checkbox id="id-cccs" />
                      <Label htmlFor="id-cccs" className="text-xs text-gray-700 cursor-pointer">By CCCSMember</Label>
                    </div>
                    <div className="flex items-center gap-2">
                      <Checkbox id="id-independent" />
                      <Label htmlFor="id-independent" className="text-xs text-gray-700 cursor-pointer">Independent Product</Label>
                    </div>
                    <div className="flex items-center gap-2">
                      <Checkbox id="id-credit" />
                      <Label htmlFor="id-credit" className="text-xs text-gray-700 cursor-pointer">By Credit File</Label>
                    </div>
                    <div className="flex items-center gap-2">
                      <Checkbox id="id-attestation" />
                      <Label htmlFor="id-attestation" className="text-xs text-gray-700 cursor-pointer">Attestation From Commissioner</Label>
                    </div>
                    <div className="flex items-center gap-2">
                      <Checkbox id="id-cheque" />
                      <Label htmlFor="id-cheque" className="text-xs text-gray-700 cursor-pointer">Cleared Cheque</Label>
                    </div>
                    <div className="flex items-center gap-2">
                      <Checkbox id="id-deposit" />
                      <Label htmlFor="id-deposit" className="text-xs text-gray-700 cursor-pointer">Deposit Account</Label>
                    </div>
                  </div>
                </div>
                <Table>
                  <TableHeader>
                    <TableRow className="bg-gray-50">
                      <TableHead className="text-xs font-semibold text-gray-700">Type</TableHead>
                      <TableHead className="text-xs font-semibold text-gray-700">ID/License Number</TableHead>
                      <TableHead className="text-xs font-semibold text-gray-700">Description</TableHead>
                      <TableHead className="text-xs font-semibold text-gray-700">Location</TableHead>
                      <TableHead className="text-xs font-semibold text-gray-700">Issued Date</TableHead>
                      <TableHead className="text-xs font-semibold text-gray-700">Expiry Date</TableHead>
                      <TableHead className="text-xs font-semibold text-gray-700">Owner</TableHead>
                      <TableHead className="text-xs font-semibold text-gray-700">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell className="text-xs text-gray-900">Driver's License</TableCell>
                      <TableCell className="text-xs text-gray-700">8127274056</TableCell>
                      <TableCell className="text-xs text-gray-700"></TableCell>
                      <TableCell className="text-xs text-gray-700">ON CA</TableCell>
                      <TableCell className="text-xs text-gray-700">01/01/2015</TableCell>
                      <TableCell className="text-xs text-gray-700">01/01/2025</TableCell>
                      <TableCell className="text-xs text-gray-700">Client</TableCell>
                      <TableCell>
                        <Button variant="ghost" size="sm" className="h-6 text-xs bg-blue-600 hover:bg-blue-700 text-white">
                          <FileText className="h-3 w-3 mr-1" />
                          Edit
                        </Button>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
            </div>

            {/* Trusted Contact Persons */}
            <div className="bg-white p-4 rounded border border-gray-200">
              <h3 className="text-sm font-semibold text-gray-900 mb-2 pb-2 border-b-2 border-blue-600">Trusted Contact Persons</h3>
              <div className="mt-4">
                <Select defaultValue="not-set">
                  <SelectTrigger className="h-8 text-sm">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="not-set">Not Set</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Client Custom Questions */}
            <div className="bg-white p-4 rounded border border-gray-200">
              <h3 className="text-sm font-semibold text-gray-900 mb-2 pb-2 border-b-2 border-blue-600">Client Custom Questions</h3>
              <div className="mt-4 space-y-4">
                <div>
                  <Label className="text-xs text-gray-500 mb-1 block">Test</Label>
                  <Input className="h-8 text-sm" />
                </div>
                <div>
                  <Label className="text-xs text-gray-500 mb-1 block">Test2</Label>
                  <Input className="h-8 text-sm" />
                </div>
              </div>
            </div>

            {/* User Defined Flags */}
            <div className="bg-white p-4 rounded border border-gray-200">
              <h3 className="text-sm font-semibold text-gray-900 mb-2 pb-2 border-b-2 border-blue-600">User Defined Flags</h3>
              <div className="mt-4">
                <div className="grid grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Checkbox id="flag-1" defaultChecked />
                      <Label htmlFor="flag-1" className="text-xs text-gray-700 cursor-pointer">1</Label>
                    </div>
                    <div className="flex items-center gap-2">
                      <Checkbox id="rebate-primary" />
                      <Label htmlFor="rebate-primary" className="text-xs text-gray-700 cursor-pointer">Rebate- Primary</Label>
                    </div>
                    <div className="flex items-center gap-2">
                      <Checkbox id="hdof-1" />
                      <Label htmlFor="hdof-1" className="text-xs text-gray-700 cursor-pointer">HDOF-1</Label>
                    </div>
                    <div className="flex items-center gap-2">
                      <Checkbox id="third-party-ipp" />
                      <Label htmlFor="third-party-ipp" className="text-xs text-gray-700 cursor-pointer">Third Party IPP</Label>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Checkbox id="transfer-fee" />
                      <Label htmlFor="transfer-fee" className="text-xs text-gray-700 cursor-pointer">Transfer Fee Agreement on file</Label>
                    </div>
                    <div className="flex items-center gap-2">
                      <Checkbox id="flag-1-2" />
                      <Label htmlFor="flag-1-2" className="text-xs text-gray-700 cursor-pointer">1</Label>
                    </div>
                    <div className="flex items-center gap-2">
                      <Checkbox id="something-new" />
                      <Label htmlFor="something-new" className="text-xs text-gray-700 cursor-pointer">SOMETHING NEW</Label>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Checkbox id="flag-1-3" />
                      <Label htmlFor="flag-1-3" className="text-xs text-gray-700 cursor-pointer">1</Label>
                    </div>
                    <div className="flex items-center gap-2">
                      <Checkbox id="rebate-secondary" />
                      <Label htmlFor="rebate-secondary" className="text-xs text-gray-700 cursor-pointer">Rebate - Secondary</Label>
                    </div>
                    <div className="flex items-center gap-2">
                      <Checkbox id="testing" />
                      <Label htmlFor="testing" className="text-xs text-gray-700 cursor-pointer">Testing</Label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
              </div>
            </div>
            {/* Bottom Action Bar */}
            <div className="flex items-center justify-between pt-4 border-t border-gray-200">
              <Button className="bg-green-600 hover:bg-green-700 text-white">
                Save Client Details
              </Button>
              <div className="flex-1"></div>
              <div className="bg-white p-4 rounded border border-gray-200">
                <h3 className="text-sm font-semibold text-gray-900 mb-2 pb-2 border-b-2 border-blue-600">Pendings</h3>
                <p className="text-xs text-gray-500 mt-2">No pendings found</p>
              </div>
            </div>
            </div>
          </ScrollArea>
        )}

        {clientViewTab === "questionnaires" && (
          <div className="space-y-4">
            {/* Investor Questionnaire Section */}
            <div className="bg-white p-4 rounded border border-gray-200">
              <h3 className="text-sm font-semibold text-gray-900 mb-4 pb-2 border-b-2 border-blue-600">Investor Questionnaire</h3>
              <div className="space-y-4">
                <p className="text-xs text-gray-500">There are no Investor Questionnaires</p>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm" className="bg-blue-600 hover:bg-blue-700 text-white border-blue-600 text-xs h-8 w-8 p-0">
                    <RefreshCw className="h-4 w-4" />
                  </Button>
                  <Button className="bg-blue-600 hover:bg-blue-700 text-white text-xs h-8">
                    New Questionnaire
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}

        {clientViewTab === "client-reports" && (
          <div className="space-y-4">
            {/* Client Reports Section */}
            <div className="bg-blue-600 px-4 py-3 rounded-t border border-blue-600">
              <div className="flex items-center gap-2">
                <ChevronDown className="h-4 w-4 text-white" />
                <h3 className="text-sm font-semibold text-white">Client Reports</h3>
              </div>
            </div>
            <div className="bg-white p-4 rounded-b border-l border-r border-b border-gray-200">
              <div className="space-y-2">
                <a href="#" className="text-xs text-blue-600 underline hover:text-blue-800 block">Portfolio Summary Report</a>
                <a href="#" className="text-xs text-blue-600 underline hover:text-blue-800 block">CRM2 Performance Report</a>
                <a href="#" className="text-xs text-blue-600 underline hover:text-blue-800 block">Portfolio Position Report</a>
                <a href="#" className="text-xs text-blue-600 underline hover:text-blue-800 block">Quick Summary Report</a>
                <a href="#" className="text-xs text-blue-600 underline hover:text-blue-800 block">Year Over Year Plan Performance Report</a>
                <a href="#" className="text-xs text-blue-600 underline hover:text-blue-800 block">Plan Performance Report</a>
                <a href="#" className="text-xs text-blue-600 underline hover:text-blue-800 block">Capital Gain</a>
                <a href="#" className="text-xs text-blue-600 underline hover:text-blue-800 block">Charges And Compensation Report</a>
                <a href="#" className="text-xs text-blue-600 underline hover:text-blue-800 block">Tax-Free Savings Accounts Calculator</a>
                <a href="#" className="text-xs text-blue-600 underline hover:text-blue-800 block">Systematic Payments Summary Report</a>
                <a href="#" className="text-xs text-blue-600 underline hover:text-blue-800 block">Retirement Savings Report</a>
                <a href="#" className="text-xs text-blue-600 underline hover:text-blue-800 block">Asset Mix</a>
                <a href="#" className="text-xs text-blue-600 underline hover:text-blue-800 block">Client Profiler</a>
              </div>
            </div>
          </div>
        )}

        {clientViewTab === "charts" && (
          <div className="space-y-4">
            {/* Secondary Navigation Tabs */}
            <Tabs value={chartsSubTab} onValueChange={(value) => setChartsSubTab(value as "smart-charts" | "allocations")}>
              <TabsList className="grid w-full grid-cols-2 h-8 mb-4">
                <TabsTrigger value="smart-charts" className="text-xs">
                  Smart Charts
                  <HelpCircle className="h-3 w-3 ml-1" />
                </TabsTrigger>
                <TabsTrigger value="allocations" className="text-xs">Allocations</TabsTrigger>
              </TabsList>

              <TabsContent value="smart-charts" className="mt-4">
                <div className="space-y-4">
                  {/* Top Controls */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-2">
                        <Checkbox id="zoom-pan" />
                        <Label htmlFor="zoom-pan" className="text-xs text-gray-700 cursor-pointer">Zoom & Pan</Label>
                      </div>
                      <Button className="bg-blue-600 hover:bg-blue-700 text-white text-xs h-8">
                        Print
                      </Button>
                    </div>
                  </div>

                  {/* Client Name Heading */}
                  <h2 className="text-lg font-semibold text-gray-900">Armstrong, Amy</h2>

                  {/* Financial Summary and Account Selection */}
                  <div className="grid grid-cols-2 gap-4">
                    {/* Financial Summary Table */}
                    <div className="bg-white p-4 rounded border border-gray-200">
                      <Table>
                        <TableHeader>
                          <TableRow className="bg-gray-50">
                            <TableHead className="text-xs font-semibold text-gray-700 py-2 px-3"></TableHead>
                            <TableHead className="text-xs font-semibold text-gray-700 py-2 px-3">Mar 31, 2020</TableHead>
                            <TableHead className="text-xs font-semibold text-gray-700 py-2 px-3">Dec 14, 2025</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          <TableRow>
                            <TableCell className="text-xs py-2 px-3 font-medium">Market Value</TableCell>
                            <TableCell className="text-xs py-2 px-3">0.00</TableCell>
                            <TableCell className="text-xs py-2 px-3">15,214.29</TableCell>
                          </TableRow>
                          <TableRow className="bg-gray-50">
                            <TableCell className="text-xs py-2 px-3 font-medium">Net Invested</TableCell>
                            <TableCell className="text-xs py-2 px-3"></TableCell>
                            <TableCell className="text-xs py-2 px-3">13,040.00</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell className="text-xs py-2 px-3 font-medium">Gain</TableCell>
                            <TableCell className="text-xs py-2 px-3"></TableCell>
                            <TableCell className="text-xs py-2 px-3">2,174.29</TableCell>
                          </TableRow>
                          <TableRow className="bg-gray-50">
                            <TableCell className="text-xs py-2 px-3 font-medium">Rate of Return</TableCell>
                            <TableCell className="text-xs py-2 px-3"></TableCell>
                            <TableCell className="text-xs py-2 px-3">4.29</TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>
                    </div>

                    {/* Account Selection */}
                    <div className="bg-white p-4 rounded border border-gray-200">
                      <div className="space-y-3">
                        <div className="flex items-center gap-3">
                          <a href="#" className="text-xs text-blue-600 underline hover:text-blue-800">Select All</a>
                          <a href="#" className="text-xs text-blue-600 underline hover:text-blue-800">Select None</a>
                        </div>
                        <div className="flex items-center gap-2">
                          <Checkbox id="resp-family" defaultChecked />
                          <Label htmlFor="resp-family" className="text-xs text-gray-700 cursor-pointer">RESP Family 7886147741</Label>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Date Range Filters */}
                  <div className="bg-white p-4 rounded border border-gray-200">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label className="text-xs text-gray-700 mb-1 block">Start Date</Label>
                        <div className="flex items-center gap-2">
                          <Select defaultValue="march">
                            <SelectTrigger className="h-8 text-sm">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="march">March</SelectItem>
                            </SelectContent>
                          </Select>
                          <Select defaultValue="31">
                            <SelectTrigger className="h-8 text-sm">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="31">31</SelectItem>
                            </SelectContent>
                          </Select>
                          <Select defaultValue="2020">
                            <SelectTrigger className="h-8 text-sm">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="2020">2020</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      <div>
                        <Label className="text-xs text-gray-700 mb-1 block">End Date</Label>
                        <div className="flex items-center gap-2">
                          <Select defaultValue="december">
                            <SelectTrigger className="h-8 text-sm">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="december">December</SelectItem>
                            </SelectContent>
                          </Select>
                          <Select defaultValue="14">
                            <SelectTrigger className="h-8 text-sm">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="14">14</SelectItem>
                            </SelectContent>
                          </Select>
                          <Select defaultValue="2025">
                            <SelectTrigger className="h-8 text-sm">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="2025">2025</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Performance Chart */}
                  <div className="bg-white p-4 rounded border border-gray-200">
                    <ResponsiveContainer width="100%" height={400}>
                      <AreaChart
                        data={[
                          { date: "2021-01", marketValue: 0, netInvested: 0 },
                          { date: "2021-06", marketValue: 2000, netInvested: 2000 },
                          { date: "2022-01", marketValue: 4500, netInvested: 4000 },
                          { date: "2022-06", marketValue: 6800, netInvested: 6000 },
                          { date: "2023-01", marketValue: 9200, netInvested: 8000 },
                          { date: "2023-06", marketValue: 11000, netInvested: 10000 },
                          { date: "2024-01", marketValue: 12800, netInvested: 11500 },
                          { date: "2024-06", marketValue: 14200, netInvested: 13000 },
                          { date: "2025-01", marketValue: 15100, netInvested: 13040 },
                          { date: "2025-12", marketValue: 15214.29, netInvested: 13040 },
                        ]}
                        margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                      >
                        <defs>
                          <linearGradient id="colorMarketValue" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#8884d8" stopOpacity={0.3} />
                            <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis 
                          dataKey="date" 
                          tick={{ fontSize: 10 }}
                          tickFormatter={(value) => {
                            const year = value.split("-")[0];
                            return year;
                          }}
                        />
                        <YAxis 
                          domain={[0, 14000]} 
                          tick={{ fontSize: 10 }}
                          ticks={[0, 2000, 4000, 6000, 8000, 10000, 12000, 14000]}
                        />
                        <RechartsTooltip />
                        <Area 
                          type="monotone" 
                          dataKey="marketValue" 
                          stroke="#8884d8" 
                          fillOpacity={1} 
                          fill="url(#colorMarketValue)" 
                        />
                        <Line 
                          type="step" 
                          dataKey="netInvested" 
                          stroke="#ef4444" 
                          strokeWidth={2}
                          dot={false}
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="allocations" className="mt-4">
                <div className="space-y-4">
                  {/* Header with Title and Print Button */}
                  <div className="flex items-center justify-between border-b border-gray-300 pb-2">
                    <h3 className="text-sm font-semibold text-gray-900">Asset Allocations</h3>
                    <Button className="bg-blue-600 hover:bg-blue-700 text-white text-xs h-8">
                      Print
                    </Button>
                  </div>

                  {/* Top Row - Three Charts */}
                  <div className="grid grid-cols-3 gap-4">
                    {/* Equity Product Allocation */}
                    <div className="bg-white p-4 rounded border border-gray-200">
                      <h4 className="text-xs font-semibold text-gray-900 mb-3 text-center">Equity Product Allocation</h4>
                      <ResponsiveContainer width="100%" height={250}>
                        <PieChart>
                          <Pie
                            data={[
                              { name: "MMF-564", value: 24.63 },
                              { name: "MMF-4529", value: 75.37 },
                            ]}
                            cx="50%"
                            cy="50%"
                            outerRadius={80}
                            fill="#8884d8"
                            dataKey="value"
                          >
                            <Cell fill="#ef4444" />
                            <Cell fill="#3b82f6" />
                          </Pie>
                          <RechartsTooltip formatter={(value: number) => `${value.toFixed(2)}%`} />
                        </PieChart>
                      </ResponsiveContainer>
                      <Table className="mt-3">
                        <TableBody>
                          <TableRow>
                            <TableCell className="text-xs py-1 px-2">MMF-564</TableCell>
                            <TableCell className="text-xs py-1 px-2 text-right">24.63%</TableCell>
                            <TableCell className="text-xs py-1 px-2 text-right">$3,747.33</TableCell>
                          </TableRow>
                          <TableRow className="bg-gray-50">
                            <TableCell className="text-xs py-1 px-2">MMF-4529</TableCell>
                            <TableCell className="text-xs py-1 px-2 text-right">75.37%</TableCell>
                            <TableCell className="text-xs py-1 px-2 text-right">$11,466.96</TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>
                    </div>

                    {/* Geographic Allocation */}
                    <div className="bg-white p-4 rounded border border-gray-200">
                      <h4 className="text-xs font-semibold text-gray-900 mb-3 text-center">Geographic Allocation</h4>
                      <ResponsiveContainer width="100%" height={250}>
                        <PieChart>
                          <Pie
                            data={[
                              { name: "Canada", value: 60.42 },
                              { name: "United States", value: 34.04 },
                              { name: "European Union", value: 3.86 },
                              { name: "Asia/Pacific Rim", value: 0.71 },
                              { name: "Japan", value: 0.41 },
                              { name: "Other European", value: 0.23 },
                              { name: "Other Asian", value: 0.17 },
                              { name: "All Others", value: 0.15 },
                            ]}
                            cx="50%"
                            cy="50%"
                            outerRadius={80}
                            fill="#8884d8"
                            dataKey="value"
                          >
                            <Cell fill="#ef4444" />
                            <Cell fill="#eab308" />
                            <Cell fill="#f97316" />
                            <Cell fill="#84cc16" />
                            <Cell fill="#3b82f6" />
                            <Cell fill="#6b7280" />
                            <Cell fill="#6b7280" />
                            <Cell fill="#6b7280" />
                          </Pie>
                          <RechartsTooltip formatter={(value: number) => `${value.toFixed(2)}%`} />
                        </PieChart>
                      </ResponsiveContainer>
                      <Table className="mt-3">
                        <TableBody>
                          <TableRow>
                            <TableCell className="text-xs py-1 px-2">Canada</TableCell>
                            <TableCell className="text-xs py-1 px-2 text-right">60.42%</TableCell>
                            <TableCell className="text-xs py-1 px-2 text-right">$9,192.77</TableCell>
                          </TableRow>
                          <TableRow className="bg-gray-50">
                            <TableCell className="text-xs py-1 px-2">Other European</TableCell>
                            <TableCell className="text-xs py-1 px-2 text-right">0.23%</TableCell>
                            <TableCell className="text-xs py-1 px-2 text-right">$34.85</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell className="text-xs py-1 px-2">European Union</TableCell>
                            <TableCell className="text-xs py-1 px-2 text-right">3.86%</TableCell>
                            <TableCell className="text-xs py-1 px-2 text-right">$587.96</TableCell>
                          </TableRow>
                          <TableRow className="bg-gray-50">
                            <TableCell className="text-xs py-1 px-2">United States</TableCell>
                            <TableCell className="text-xs py-1 px-2 text-right">34.04%</TableCell>
                            <TableCell className="text-xs py-1 px-2 text-right">$5,178.35</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell className="text-xs py-1 px-2">Japan</TableCell>
                            <TableCell className="text-xs py-1 px-2 text-right">0.41%</TableCell>
                            <TableCell className="text-xs py-1 px-2 text-right">$62.58</TableCell>
                          </TableRow>
                          <TableRow className="bg-gray-50">
                            <TableCell className="text-xs py-1 px-2">Asia/Pacific Rim</TableCell>
                            <TableCell className="text-xs py-1 px-2 text-right">0.71%</TableCell>
                            <TableCell className="text-xs py-1 px-2 text-right">$108.30</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell className="text-xs py-1 px-2">Other Asian</TableCell>
                            <TableCell className="text-xs py-1 px-2 text-right">0.17%</TableCell>
                            <TableCell className="text-xs py-1 px-2 text-right">$26.61</TableCell>
                          </TableRow>
                          <TableRow className="bg-gray-50">
                            <TableCell className="text-xs py-1 px-2">All Others</TableCell>
                            <TableCell className="text-xs py-1 px-2 text-right">0.15%</TableCell>
                            <TableCell className="text-xs py-1 px-2 text-right">$22.88</TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>
                    </div>

                    {/* Asset Allocation */}
                    <div className="bg-white p-4 rounded border border-gray-200">
                      <h4 className="text-xs font-semibold text-gray-900 mb-3 text-center">Asset Allocation</h4>
                      <ResponsiveContainer width="100%" height={250}>
                        <PieChart>
                          <Pie
                            data={[
                              { name: "Canadian Equity", value: 44.97 },
                              { name: "US Equity", value: 30.75 },
                              { name: "Domestic Bonds", value: 11.87 },
                              { name: "International Equity", value: 5.10 },
                              { name: "Cash and Equivalents", value: 3.72 },
                              { name: "Foreign Bonds", value: 3.31 },
                              { name: "Other", value: 0.18 },
                              { name: "All Others", value: 0.09 },
                            ]}
                            cx="50%"
                            cy="50%"
                            outerRadius={80}
                            fill="#8884d8"
                            dataKey="value"
                          >
                            <Cell fill="#3b82f6" />
                            <Cell fill="#eab308" />
                            <Cell fill="#9333ea" />
                            <Cell fill="#f97316" />
                            <Cell fill="#84cc16" />
                            <Cell fill="#ef4444" />
                            <Cell fill="#6b7280" />
                            <Cell fill="#6b7280" />
                          </Pie>
                          <RechartsTooltip formatter={(value: number) => `${value.toFixed(2)}%`} />
                        </PieChart>
                      </ResponsiveContainer>
                      <Table className="mt-3">
                        <TableBody>
                          <TableRow>
                            <TableCell className="text-xs py-1 px-2">Foreign Bonds</TableCell>
                            <TableCell className="text-xs py-1 px-2 text-right">3.31%</TableCell>
                            <TableCell className="text-xs py-1 px-2 text-right">$504.23</TableCell>
                          </TableRow>
                          <TableRow className="bg-gray-50">
                            <TableCell className="text-xs py-1 px-2">International Equity</TableCell>
                            <TableCell className="text-xs py-1 px-2 text-right">5.10%</TableCell>
                            <TableCell className="text-xs py-1 px-2 text-right">$776.08</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell className="text-xs py-1 px-2">Domestic Bonds</TableCell>
                            <TableCell className="text-xs py-1 px-2 text-right">11.87%</TableCell>
                            <TableCell className="text-xs py-1 px-2 text-right">$1,806.10</TableCell>
                          </TableRow>
                          <TableRow className="bg-gray-50">
                            <TableCell className="text-xs py-1 px-2">US Equity</TableCell>
                            <TableCell className="text-xs py-1 px-2 text-right">30.75%</TableCell>
                            <TableCell className="text-xs py-1 px-2 text-right">$4,678.13</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell className="text-xs py-1 px-2">Cash and Equivalents</TableCell>
                            <TableCell className="text-xs py-1 px-2 text-right">3.72%</TableCell>
                            <TableCell className="text-xs py-1 px-2 text-right">$566.26</TableCell>
                          </TableRow>
                          <TableRow className="bg-gray-50">
                            <TableCell className="text-xs py-1 px-2">Canadian Equity</TableCell>
                            <TableCell className="text-xs py-1 px-2 text-right">44.97%</TableCell>
                            <TableCell className="text-xs py-1 px-2 text-right">$6,841.88</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell className="text-xs py-1 px-2">All Others</TableCell>
                            <TableCell className="text-xs py-1 px-2 text-right">0.09%</TableCell>
                            <TableCell className="text-xs py-1 px-2 text-right">$13.49</TableCell>
                          </TableRow>
                          <TableRow className="bg-gray-50">
                            <TableCell className="text-xs py-1 px-2">Other</TableCell>
                            <TableCell className="text-xs py-1 px-2 text-right">0.18%</TableCell>
                            <TableCell className="text-xs py-1 px-2 text-right">$28.13</TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>
                    </div>
                  </div>

                  {/* Bottom Row - Sector Allocation */}
                  <div className="bg-white p-4 rounded border border-gray-200">
                    <h4 className="text-xs font-semibold text-gray-900 mb-3 text-center">Sector Allocation</h4>
                    <div className="grid grid-cols-2 gap-4">
                      <ResponsiveContainer width="100%" height={250}>
                        <PieChart>
                          <Pie
                            data={[
                              { name: "Financial Services", value: 21.51 },
                              { name: "All Others", value: 18.70 },
                              { name: "Fixed Income", value: 15.35 },
                              { name: "Technology", value: 16.00 },
                              { name: "Consumer Services", value: 8.39 },
                              { name: "Industrial Services", value: 7.89 },
                              { name: "Basic Materials", value: 6.60 },
                              { name: "Energy", value: 5.56 },
                            ]}
                            cx="50%"
                            cy="50%"
                            outerRadius={80}
                            fill="#8884d8"
                            dataKey="value"
                          >
                            <Cell fill="#ef4444" />
                            <Cell fill="#3b82f6" />
                            <Cell fill="#ec4899" />
                            <Cell fill="#22c55e" />
                            <Cell fill="#1e40af" />
                            <Cell fill="#9333ea" />
                            <Cell fill="#eab308" />
                            <Cell fill="#f97316" />
                          </Pie>
                          <RechartsTooltip formatter={(value: number) => `${value.toFixed(2)}%`} />
                        </PieChart>
                      </ResponsiveContainer>
                      <div>
                        <Table>
                          <TableBody>
                            <TableRow>
                              <TableCell className="text-xs py-1 px-2">Financial Services</TableCell>
                              <TableCell className="text-xs py-1 px-2 text-right">21.51%</TableCell>
                              <TableCell className="text-xs py-1 px-2 text-right">$3,273.31</TableCell>
                            </TableRow>
                            <TableRow className="bg-gray-50">
                              <TableCell className="text-xs py-1 px-2">Energy</TableCell>
                              <TableCell className="text-xs py-1 px-2 text-right">5.56%</TableCell>
                              <TableCell className="text-xs py-1 px-2 text-right">$846.16</TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell className="text-xs py-1 px-2">Basic Materials</TableCell>
                              <TableCell className="text-xs py-1 px-2 text-right">6.60%</TableCell>
                              <TableCell className="text-xs py-1 px-2 text-right">$1,004.34</TableCell>
                            </TableRow>
                            <TableRow className="bg-gray-50">
                              <TableCell className="text-xs py-1 px-2">Industrial Services</TableCell>
                              <TableCell className="text-xs py-1 px-2 text-right">7.89%</TableCell>
                              <TableCell className="text-xs py-1 px-2 text-right">$1,199.88</TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell className="text-xs py-1 px-2">Technology</TableCell>
                              <TableCell className="text-xs py-1 px-2 text-right">16.00%</TableCell>
                              <TableCell className="text-xs py-1 px-2 text-right">$2,433.61</TableCell>
                            </TableRow>
                            <TableRow className="bg-gray-50">
                              <TableCell className="text-xs py-1 px-2">Consumer Services</TableCell>
                              <TableCell className="text-xs py-1 px-2 text-right">8.39%</TableCell>
                              <TableCell className="text-xs py-1 px-2 text-right">$1,276.65</TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell className="text-xs py-1 px-2">Fixed Income</TableCell>
                              <TableCell className="text-xs py-1 px-2 text-right">15.35%</TableCell>
                              <TableCell className="text-xs py-1 px-2 text-right">$2,335.79</TableCell>
                            </TableRow>
                            <TableRow className="bg-gray-50">
                              <TableCell className="text-xs py-1 px-2">All Others</TableCell>
                              <TableCell className="text-xs py-1 px-2 text-right">18.70%</TableCell>
                              <TableCell className="text-xs py-1 px-2 text-right">$2,844.55</TableCell>
                            </TableRow>
                          </TableBody>
                        </Table>
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        )}

        {clientViewTab === "trading" && (
          <div className="space-y-4">
            {/* Plan Selection */}
            <div className="flex items-center gap-3">
              <Label className="text-xs text-gray-700">Plan:</Label>
              <Select>
                <SelectTrigger className="h-8 text-sm w-64">
                  <SelectValue placeholder="Select a Plan" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="7886147741">7886147741 (RESP Family Client Name, Joint)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Plan Header Bar */}
            <div className="bg-gray-200 px-4 py-3 rounded border border-gray-300">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">
                    7886147741 (RESP Family Client Name, Joint) 9823-2232 <span className="underline cursor-pointer">Marsh, Antoine</span>
                  </p>
                  <div className="mt-1">
                    <p className="text-xs text-gray-700">Joint with <span className="underline cursor-pointer">Armstrong, Oliver</span> (Primary)</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <BarChart3 className="h-4 w-4 cursor-pointer text-gray-700" />
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-6 w-6 p-0 text-gray-700 hover:bg-gray-100"
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Investment/Product Table */}
            <div className="border border-gray-300 rounded">
              <div className="p-4">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-gray-100">
                      <TableHead className="text-xs font-semibold text-gray-700">Supplier</TableHead>
                      <TableHead className="text-xs font-semibold text-gray-700">Account</TableHead>
                      <TableHead className="text-xs font-semibold text-gray-700">Product</TableHead>
                      <TableHead className="text-xs font-semibold text-gray-700">Risk</TableHead>
                      <TableHead className="text-xs font-semibold text-gray-700">Objective</TableHead>
                      <TableHead className="text-xs font-semibold text-gray-700">Market value</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell className="text-sm">
                        <span className="font-bold text-blue-600 underline cursor-pointer">MMF-564</span>
                      </TableCell>
                      <TableCell className="text-sm">6237058732</TableCell>
                      <TableCell className="text-sm">MANULIFE SIMPLICITY MODERATE PORTFOLIO</TableCell>
                      <TableCell className="text-sm">LM</TableCell>
                      <TableCell className="text-sm">
                        <div className="flex flex-col gap-1">
                          <span>75% In, 25% Gr</span>
                          <div className="flex items-center gap-1">
                            <FileText className="h-3 w-3 text-blue-600" />
                            <Folder className="h-3 w-3 text-red-600" />
                            <Lightbulb className="h-3 w-3 text-yellow-600" />
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="text-sm font-semibold">$3,747.33</TableCell>
                    </TableRow>
                    <TableRow className="bg-blue-50">
                      <TableCell className="text-sm">
                        <span className="font-bold text-blue-600 underline cursor-pointer">MMF-4529</span>
                      </TableCell>
                      <TableCell className="text-sm">0205734337</TableCell>
                      <TableCell className="text-sm">MANULIFE DIVIDEND INCOME FUND</TableCell>
                      <TableCell className="text-sm">M</TableCell>
                      <TableCell className="text-sm">
                        <div className="flex flex-col gap-1">
                          <span>100% Ba</span>
                          <div className="flex items-center gap-1">
                            <FileText className="h-3 w-3 text-blue-600" />
                            <Folder className="h-3 w-3 text-red-600" />
                            <Lightbulb className="h-3 w-3 text-yellow-600" />
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="text-sm font-semibold">$11,466.96</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
            </div>

            {/* Trust Account Balance Summary */}
            <div className="bg-blue-50 p-4 rounded border border-blue-200">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-gray-700">Settled Trust Account Balance CAD</span>
                <span className="text-sm font-semibold">$0.00</span>
              </div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-gray-700">Settled Trust Account Balance USD</span>
                <span className="text-sm font-semibold">$0.00</span>
              </div>
              <div className="flex justify-between items-center pt-2 border-t border-blue-200">
                <span className="text-sm font-semibold text-gray-900">Total in CAD</span>
                <span className="text-sm font-bold">$15,214.29</span>
              </div>
            </div>
          </div>
        )}

        {clientViewTab === "portfolio" && (
          <div className="w-full">
            <div className="flex gap-4">
              {/* Left Pane - Plan Selection */}
              <div className="w-1/3 border-r border-gray-200 pr-4">
                <div className="space-y-4 py-2">
                  {/* Include Inactive Plans */}
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <Checkbox id="include-inactive-plans" checked={includeInactivePlans} onCheckedChange={(checked) => setIncludeInactivePlans(checked as boolean)} />
                      <Label htmlFor="include-inactive-plans" className="text-xs text-gray-700 cursor-pointer">Include Inactive Plans</Label>
                    </div>
                    <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-white text-xs h-7">
                      Add New Plan
                    </Button>
                  </div>

                {/* Plans List */}
                <div className="space-y-2">
                  {plansList.map((plan) => (
                    <div
                      key={plan.id}
                      onClick={() => {
                        setSelectedPlanForDetails(plan.id);
                        setSelectedFundAccount(null);
                        setSelectedTransaction(null);
                      }}
                      className={`border rounded p-2 cursor-pointer transition-colors ${
                        selectedPlanForDetails === plan.id
                          ? "border-blue-500 bg-blue-50"
                          : "border-gray-200 hover:bg-gray-50"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Building2 className="h-4 w-4 text-gray-600" />
                          <div>
                            <p className="text-xs font-medium text-gray-900">
                              {plan.accountNumber} ({plan.type} {plan.name}, {plan.category})
                            </p>
                          </div>
                        </div>
                        <span className="text-xs font-semibold text-gray-900">{plan.marketValue}</span>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Selected Plan */}
                <div className="border border-gray-300 rounded p-3 bg-blue-50">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Building2 className="h-4 w-4 text-gray-600" />
                      <div>
                        <p className="text-xs font-medium text-gray-900">
                          {selectedPlanData.accountNumber} ({selectedPlanData.type} {selectedPlanData.name}, {selectedPlanData.category})
                        </p>
                      </div>
                    </div>
                    <span className="text-xs font-semibold text-gray-900">{selectedPlanData.marketValue}</span>
                  </div>
                </div>

                {/* Account Tabs */}
                <Tabs value={accountViewType} onValueChange={(value) => setAccountViewType(value as "fund-accounts" | "gics")}>
                  <TabsList className="grid w-full grid-cols-2 h-8">
                    <TabsTrigger value="fund-accounts" className="text-xs">
                      Fund Accounts
                      <HelpCircle className="h-3 w-3 ml-1" />
                    </TabsTrigger>
                    <TabsTrigger value="gics" className="text-xs">
                      GICs
                      <HelpCircle className="h-3 w-3 ml-1" />
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="fund-accounts" className="mt-4">
                    <div className="flex items-center gap-2 mb-3">
                      <Checkbox id="include-inactive-accounts" checked={includeInactiveAccounts} onCheckedChange={(checked) => setIncludeInactiveAccounts(checked as boolean)} />
                      <Label htmlFor="include-inactive-accounts" className="text-xs text-gray-700 cursor-pointer">Include Inactive Accounts</Label>
                    </div>
                    <div className="space-y-2">
                      {fundAccounts.map((account) => (
                        <div
                          key={account.id}
                          onClick={() => {
                            setSelectedFundAccount(account.id);
                            setSelectedTransaction(null); // Clear transaction selection to show fund account details
                          }}
                          className={`border rounded p-2 cursor-pointer transition-colors ${
                            selectedFundAccount === account.id
                              ? "border-blue-500 bg-blue-50"
                              : "border-gray-200 hover:bg-gray-50"
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex-1 min-w-0">
                              <p className="text-xs font-medium text-gray-900 truncate">{account.fullName}</p>
                            </div>
                            <div className="flex items-center gap-2 ml-2">
                              <span className="text-xs font-semibold text-gray-900">{account.marketValue}</span>
                              <div className="flex items-center gap-1">
                                <BarChart3 className="h-3 w-3 text-gray-500" />
                                <FileText className="h-3 w-3 text-gray-500" />
                                <HelpCircle className="h-3 w-3 text-gray-500" />
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </TabsContent>

                  <TabsContent value="gics" className="mt-4">
                    <p className="text-xs text-gray-500">No GIC accounts found</p>
                  </TabsContent>
                </Tabs>

                {/* Transactions Tab */}
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <div className="flex items-center gap-1 mb-3">
                    <span className="text-xs font-semibold text-gray-900">Transactions</span>
                    <HelpCircle className="h-3 w-3 text-gray-500" />
                  </div>
                  
                  {selectedFundAccount ? (
                    <div className="space-y-3">
                      {/* Filter Dropdowns */}
                      <div className="space-y-2">
                        <div>
                          <Label className="text-[10px] text-gray-500 mb-0.5 block">Display Option:</Label>
                          <Select value={transactionsDisplayOption} onValueChange={setTransactionsDisplayOption}>
                            <SelectTrigger className="h-7 text-[11px]">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Valid and Pending">Valid and Pending</SelectItem>
                              <SelectItem value="Valid Only">Valid Only</SelectItem>
                              <SelectItem value="Pending Only">Pending Only</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <Label className="text-[10px] text-gray-500 mb-0.5 block">Sort by Trade Date</Label>
                          <Select value={transactionsSortBy} onValueChange={setTransactionsSortBy}>
                            <SelectTrigger className="h-7 text-[11px]">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Trade Date">Trade Date</SelectItem>
                              <SelectItem value="Amount">Amount</SelectItem>
                              <SelectItem value="Type">Type</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <Label className="text-[10px] text-gray-500 mb-0.5 block">Selected Account</Label>
                          <Select defaultValue={selectedFundAccount}>
                            <SelectTrigger className="h-7 text-[11px]">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              {fundAccounts.map((account) => (
                                <SelectItem key={account.id} value={account.id}>
                                  {account.id}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      
                      {/* Transactions Table */}
                      <div className="border border-gray-200 rounded overflow-hidden">
                        <Table>
                          <TableHeader>
                            <TableRow className="bg-gray-100">
                              <TableHead className="text-[10px] font-semibold text-gray-900 py-1.5 px-2 w-8"></TableHead>
                              <TableHead className="text-[10px] font-semibold text-gray-900 py-1.5 px-2">Date</TableHead>
                              <TableHead className="text-[10px] font-semibold text-gray-900 py-1.5 px-2">Gross Amount</TableHead>
                              <TableHead className="text-[10px] font-semibold text-gray-900 py-1.5 px-2">Net Amount</TableHead>
                              <TableHead className="text-[10px] font-semibold text-gray-900 py-1.5 px-2">Price</TableHead>
                              <TableHead className="text-[10px] font-semibold text-gray-900 py-1.5 px-2">Status</TableHead>
                              <TableHead className="text-[10px] font-semibold text-gray-900 py-1.5 px-2">Type</TableHead>
                              <TableHead className="text-[10px] font-semibold text-gray-900 py-1.5 px-2">Calculated Share Balance</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {transactions.map((transaction) => (
                              <TableRow
                                key={transaction.id}
                                onClick={() => setSelectedTransaction(transaction.id)}
                                className={`cursor-pointer ${
                                  selectedTransaction === transaction.id
                                    ? "bg-blue-100"
                                    : "hover:bg-gray-50"
                                }`}
                              >
                                <TableCell className="py-1.5 px-2" onClick={(e) => e.stopPropagation()}>
                                  {selectedTransaction === transaction.id ? (
                                    <div className="w-3 h-3 bg-white border border-gray-300"></div>
                                  ) : (
                                    <Checkbox
                                      checked={false}
                                      onCheckedChange={(checked) => {
                                        if (checked) {
                                          setSelectedTransaction(transaction.id);
                                        }
                                      }}
                                    />
                                  )}
                                </TableCell>
                                <TableCell className="text-[10px] py-1.5 px-2 text-gray-900">{transaction.date}</TableCell>
                                <TableCell className="text-[10px] py-1.5 px-2 text-gray-900">{transaction.grossAmount}</TableCell>
                                <TableCell className="text-[10px] py-1.5 px-2 text-gray-900">{transaction.netAmount}</TableCell>
                                <TableCell className="text-[10px] py-1.5 px-2 text-gray-900">{transaction.price}</TableCell>
                                <TableCell className="text-[10px] py-1.5 px-2">
                                  <span className="underline text-blue-600 cursor-pointer">{transaction.status}</span>
                                </TableCell>
                                <TableCell className="text-[10px] py-1.5 px-2 text-gray-900">{transaction.type}</TableCell>
                                <TableCell className="text-[10px] py-1.5 px-2 text-gray-900">{transaction.shareBalance}</TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </div>
                    </div>
                  ) : (
                    <p className="text-xs text-gray-500 italic">Please select a fund account above.</p>
                  )}
                </div>
              </div>
            </div>

            {/* Right Pane - Plan Details, Fund Account Details, or Transaction Details */}
            <div className="flex-1 pl-4">
              <div className="space-y-4 py-2">
                {selectedTransactionData ? (
                  /* Transaction Details */
                  <div className="space-y-4">
                    <Tabs value={transactionDetailTab} onValueChange={setTransactionDetailTab}>
                      <TabsList className="grid w-full grid-cols-7 h-8 mb-4">
                        <TabsTrigger value="details" className="text-xs">Details</TabsTrigger>
                        <TabsTrigger value="fundserv" className="text-xs">
                          Fundserv
                          <HelpCircle className="h-3 w-3 ml-1" />
                        </TabsTrigger>
                        <TabsTrigger value="payment-instructions" className="text-xs">
                          Payment Instructions
                          <HelpCircle className="h-3 w-3 ml-1" />
                        </TabsTrigger>
                        <TabsTrigger value="notes" className="text-xs">
                          Notes
                          <HelpCircle className="h-3 w-3 ml-1" />
                        </TabsTrigger>
                        <TabsTrigger value="attachments" className="text-xs">
                          Attachments
                          <HelpCircle className="h-3 w-3 ml-1" />
                        </TabsTrigger>
                        <TabsTrigger value="reviews" className="text-xs">
                          Reviews
                          <HelpCircle className="h-3 w-3 ml-1" />
                        </TabsTrigger>
                        <TabsTrigger value="related-transactions" className="text-xs">Related Transactions</TabsTrigger>
                      </TabsList>
                      
                      <TabsContent value="details" className="mt-4">
                        <div className="space-y-4">
                          <h3 className="text-xs font-semibold text-gray-900">Details</h3>
                          
                          {/* Transaction Information Section */}
                          <div className="bg-white p-3 rounded border border-gray-200">
                            <h4 className="text-xs font-semibold text-gray-900 mb-3 pb-1 border-b-2 border-blue-600">Transaction Information</h4>
                            <div className="grid grid-cols-2 gap-4">
                              {/* Left Column */}
                              <div className="space-y-3">
                                <div>
                                  <Label className="text-[10px] text-gray-500 mb-0.5 block">Status</Label>
                                  <Input className="h-7 text-[11px]" value={selectedTransactionData.status} readOnly />
                                </div>
                                <div>
                                  <Label className="text-[10px] text-gray-500 mb-0.5 block">Transaction Type</Label>
                                  <Input className="h-7 text-[11px] font-semibold" value={selectedTransactionData.type} readOnly />
                                </div>
                                <div>
                                  <Label className="text-[10px] text-gray-500 mb-0.5 block">Source Identifier</Label>
                                  <Input className="h-7 text-[11px]" value="470704410" readOnly />
                                </div>
                                <div>
                                  <Label className="text-[10px] text-gray-500 mb-0.5 block">ID</Label>
                                  <Input className="h-7 text-[11px]" value="43453037" readOnly />
                                </div>
                                <div>
                                  <Label className="text-[10px] text-gray-500 mb-0.5 block">Sequence</Label>
                                  <Input className="h-7 text-[11px]" value="185" readOnly />
                                </div>
                                <div>
                                  <Label className="text-[10px] text-gray-500 mb-0.5 block">Product Indicator</Label>
                                  <Input className="h-7 text-[11px]" value="-" readOnly />
                                </div>
                                <div>
                                  <Label className="text-[10px] text-gray-500 mb-0.5 block">Contribution Type</Label>
                                  <Input className="h-7 text-[11px]" value="N/A" readOnly />
                                </div>
                                <div>
                                  <Label className="text-[10px] text-gray-500 mb-0.5 block">EPA Status</Label>
                                  <Input className="h-7 text-[11px]" value="Unknown" readOnly />
                                </div>
                                <div>
                                  <Label className="text-[10px] text-gray-500 mb-0.5 block">Conversion</Label>
                                  <Input className="h-7 text-[11px]" value="No" readOnly />
                                </div>
                                <div>
                                  <Label className="text-[10px] text-gray-500 mb-0.5 block">Trade Context</Label>
                                  <Input className="h-7 text-[11px]" value="Not Set" readOnly />
                                </div>
                              </div>
                              
                              {/* Right Column */}
                              <div className="space-y-3">
                                <div>
                                  <Label className="text-[10px] text-gray-500 mb-0.5 block">Trade Date</Label>
                                  <Input className="h-7 text-[11px]" value={selectedTransactionData.date} readOnly />
                                </div>
                                <div>
                                  <Label className="text-[10px] text-gray-500 mb-0.5 block">Processing Date</Label>
                                  <Input className="h-7 text-[11px]" value={selectedTransactionData.date} readOnly />
                                </div>
                                <div>
                                  <Label className="text-[10px] text-gray-500 mb-0.5 block">Order Date</Label>
                                  <Input className="h-7 text-[11px]" value={selectedTransactionData.date} readOnly />
                                </div>
                                <div>
                                  <Label className="text-[10px] text-gray-500 mb-0.5 block">Settlement Date</Label>
                                  <Input className="h-7 text-[11px]" value={selectedTransactionData.date} readOnly />
                                </div>
                                <div>
                                  <Label className="text-[10px] text-gray-500 mb-0.5 block">Use Trust Accounting</Label>
                                  <Input className="h-7 text-[11px]" value="No" readOnly />
                                </div>
                                <div>
                                  <Label className="text-[10px] text-gray-500 mb-0.5 block">Trust Bank Account</Label>
                                  <Input className="h-7 text-[11px]" value="" readOnly />
                                </div>
                                <div>
                                  <Label className="text-[10px] text-gray-500 mb-0.5 block">Wire Order</Label>
                                  <Input className="h-7 text-[11px]" value="" readOnly />
                                </div>
                                <div>
                                  <Label className="text-[10px] text-gray-500 mb-0.5 block">Taxable Event Indicator</Label>
                                  <Input className="h-7 text-[11px]" value="" readOnly />
                                </div>
                                <div>
                                  <Label className="text-[10px] text-gray-500 mb-0.5 block">First 60 days</Label>
                                  <Input className="h-7 text-[11px]" value="No" readOnly />
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* Sub-Sections */}
                          <div className="grid grid-cols-3 gap-4">
                            {/* Quantities */}
                            <div className="bg-white p-3 rounded border border-gray-200">
                              <h4 className="text-xs font-semibold text-gray-900 mb-3 pb-1 border-b-2 border-blue-600">Quantities</h4>
                              <div className="space-y-2">
                                <div>
                                  <Label className="text-[10px] text-gray-500 mb-0.5 block">Amount</Label>
                                  <Input className="h-7 text-[11px]" value={selectedTransactionData.grossAmount} readOnly />
                                </div>
                                <div>
                                  <Label className="text-[10px] text-gray-500 mb-0.5 block">Unit Type</Label>
                                  <Input className="h-7 text-[11px]" value="dollars" readOnly />
                                </div>
                                <div>
                                  <Label className="text-[10px] text-gray-500 mb-0.5 block">Shares</Label>
                                  <Input className="h-7 text-[11px]" value="0.0650" readOnly />
                                </div>
                                <div>
                                  <Label className="text-[10px] text-gray-500 mb-0.5 block">Share Balance</Label>
                                  <Input className="h-7 text-[11px]" value={selectedTransactionData.shareBalance} readOnly />
                                </div>
                                <div>
                                  <Label className="text-[10px] text-gray-500 mb-0.5 block">Unit Price</Label>
                                  <Input className="h-7 text-[11px]" value={selectedTransactionData.price} readOnly />
                                </div>
                                <div>
                                  <Label className="text-[10px] text-gray-500 mb-0.5 block">Average Cost</Label>
                                  <Input className="h-7 text-[11px]" value="$12.9084" readOnly />
                                </div>
                                <div>
                                  <Label className="text-[10px] text-gray-500 mb-0.5 block">Gross Amount</Label>
                                  <Input className="h-7 text-[11px]" value={selectedTransactionData.grossAmount} readOnly />
                                </div>
                                <div>
                                  <Label className="text-[10px] text-gray-500 mb-0.5 block">Reversal</Label>
                                  <Input className="h-7 text-[11px]" value="No" readOnly />
                                </div>
                                <div>
                                  <Label className="text-[10px] text-gray-500 mb-0.5 block">Settlement Amount</Label>
                                  <Input className="h-7 text-[11px]" value="$0.00" readOnly />
                                </div>
                              </div>
                            </div>

                            {/* Earnings */}
                            <div className="bg-white p-3 rounded border border-gray-200">
                              <h4 className="text-xs font-semibold text-gray-900 mb-3 pb-1 border-b-2 border-blue-600">Earnings</h4>
                              <div className="space-y-2">
                                <div>
                                  <Label className="text-[10px] text-gray-500 mb-0.5 block">FEL Max Rate (%)</Label>
                                  <Input className="h-7 text-[11px]" value="0" readOnly />
                                </div>
                                <div>
                                  <Label className="text-[10px] text-gray-500 mb-0.5 block">DSC Rate (%)</Label>
                                  <Input className="h-7 text-[11px]" value="0" readOnly />
                                </div>
                                <div>
                                  <Label className="text-[10px] text-gray-500 mb-0.5 block">Dealer Commission</Label>
                                  <Input className="h-7 text-[11px]" value="$0.00" readOnly />
                                </div>
                                <div>
                                  <Label className="text-[10px] text-gray-500 mb-0.5 block">Dealer At Time Of Trade</Label>
                                  <Input className="h-7 text-[11px]" value="9823" readOnly />
                                </div>
                                <div>
                                  <Label className="text-[10px] text-gray-500 mb-0.5 block">Rep At Time Of Trade</Label>
                                  <Input className="h-7 text-[11px]" value="2232 Marsh, Antoine" readOnly />
                                </div>
                              </div>
                            </div>

                            {/* Fees And Charges */}
                            <div className="bg-white p-3 rounded border border-gray-200">
                              <h4 className="text-xs font-semibold text-gray-900 mb-3 pb-1 border-b-2 border-blue-600">Fees And Charges</h4>
                              <div className="space-y-2">
                                <div>
                                  <Label className="text-[10px] text-gray-500 mb-0.5 block">Withholding Tax</Label>
                                  <Input className="h-7 text-[11px]" value="0.0000" readOnly />
                                </div>
                                <div>
                                  <Label className="text-[10px] text-gray-500 mb-0.5 block">DSC</Label>
                                  <Input className="h-7 text-[11px]" value="0.0000" readOnly />
                                </div>
                                <div>
                                  <Label className="text-[10px] text-gray-500 mb-0.5 block">HST</Label>
                                  <Input className="h-7 text-[11px]" value="$0.00" readOnly />
                                </div>
                                <div>
                                  <Label className="text-[10px] text-gray-500 mb-0.5 block">Fees</Label>
                                  <Input className="h-7 text-[11px]" value="$0.00" readOnly />
                                </div>
                                <div>
                                  <Label className="text-[10px] text-gray-500 mb-0.5 block">LSIF Federal Clawback</Label>
                                  <Input className="h-7 text-[11px]" value="$0.00" readOnly />
                                </div>
                                <div>
                                  <Label className="text-[10px] text-gray-500 mb-0.5 block">LSIF Provincial Clawback</Label>
                                  <Input className="h-7 text-[11px]" value="$0.00" readOnly />
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </TabsContent>
                      
                      <TabsContent value="fundserv" className="mt-4">
                        <div className="space-y-4">
                          {/* Fundserv Processing Section */}
                          <div className="bg-blue-50 p-3 rounded border border-blue-200">
                            <h4 className="text-xs font-semibold text-gray-900 mb-3 pb-1 border-b-2 border-blue-600">Fundserv Processing</h4>
                            <div className="grid grid-cols-2 gap-3">
                              <div>
                                <Label className="text-[10px] text-gray-500 mb-0.5 block">Net Commission Settlement</Label>
                                <Input className="h-7 text-[11px]" value="N/A" readOnly />
                              </div>
                              <div>
                                <Label className="text-[10px] text-gray-500 mb-0.5 block">Response Status</Label>
                                <Input className="h-7 text-[11px]" value="Unknown" readOnly />
                              </div>
                              <div>
                                <Label className="text-[10px] text-gray-500 mb-0.5 block">Response Source</Label>
                                <Input className="h-7 text-[11px]" value="" readOnly />
                              </div>
                              <div>
                                <Label className="text-[10px] text-gray-500 mb-0.5 block">Settlement Source</Label>
                                <Input className="h-7 text-[11px]" value="N/A" readOnly />
                              </div>
                              <div>
                                <Label className="text-[10px] text-gray-500 mb-0.5 block">Order Source</Label>
                                <Input className="h-7 text-[11px]" value="Fund Company" readOnly />
                              </div>
                              <div>
                                <Label className="text-[10px] text-gray-500 mb-0.5 block">Interactive Order Status</Label>
                                <Input className="h-7 text-[11px]" value="Unreleased" readOnly />
                              </div>
                              <div>
                                <Label className="text-[10px] text-gray-500 mb-0.5 block">Settlement Method</Label>
                                <Input className="h-7 text-[11px]" value="N/A" readOnly />
                              </div>
                              <div>
                                <Label className="text-[10px] text-gray-500 mb-0.5 block">Revision Number</Label>
                                <Input className="h-7 text-[11px]" value="0" readOnly />
                              </div>
                            </div>
                          </div>

                          {/* Trading Files Section */}
                          <div className="bg-white p-3 rounded border border-gray-200">
                            <h4 className="text-xs font-semibold text-gray-900 mb-3 pb-1 border-b-2 border-blue-600">Trading Files</h4>
                            <Table>
                              <TableHeader>
                                <TableRow className="bg-gray-100">
                                  <TableHead className="text-[10px] font-semibold text-gray-900 py-1.5 px-2">Created</TableHead>
                                  <TableHead className="text-[10px] font-semibold text-gray-900 py-1.5 px-2">Type</TableHead>
                                  <TableHead className="text-[10px] font-semibold text-gray-900 py-1.5 px-2">File Name</TableHead>
                                </TableRow>
                              </TableHeader>
                              <TableBody>
                                <TableRow>
                                  <TableCell className="text-[10px] py-1.5 px-2 text-gray-900">04-28-2025 07:13:58</TableCell>
                                  <TableCell className="text-[10px] py-1.5 px-2 text-gray-900">Transaction Reconciliation</TableCell>
                                  <TableCell className="text-[10px] py-1.5 px-2 text-gray-900">TSP0009823.042525CIG9.Z01</TableCell>
                                </TableRow>
                              </TableBody>
                            </Table>
                          </div>

                          {/* Errors Section */}
                          <div className="bg-white p-3 rounded border border-gray-200">
                            <h4 className="text-xs font-semibold text-gray-900 mb-3 pb-1 border-b-2 border-blue-600">Errors</h4>
                            <Table>
                              <TableHeader>
                                <TableRow className="bg-gray-100">
                                  <TableHead className="text-[10px] font-semibold text-gray-900 py-1.5 px-2">Error Message</TableHead>
                                  <TableHead className="text-[10px] font-semibold text-gray-900 py-1.5 px-2">Return Code</TableHead>
                                </TableRow>
                              </TableHeader>
                              <TableBody>
                                <TableRow>
                                  <TableCell colSpan={2} className="text-center py-4">
                                    <p className="text-xs text-gray-500">No errors found</p>
                                  </TableCell>
                                </TableRow>
                              </TableBody>
                            </Table>
                          </div>
                        </div>
                      </TabsContent>
                      
                      <TabsContent value="payment-instructions" className="mt-4">
                        <div className="space-y-4">
                          {/* Misc Payment Settings Section */}
                          <div className="bg-white rounded border border-gray-200 overflow-hidden">
                            <div className="bg-blue-600 text-white px-3 py-2">
                              <h4 className="text-xs font-semibold">Misc Payment Settings</h4>
                            </div>
                            <div className="p-3">
                              <div className="grid grid-cols-2 gap-4">
                                <div>
                                  <Label className="text-[10px] text-gray-500 mb-0.5 block">Nominee Payment Option</Label>
                                  <Input className="h-7 text-[11px] font-semibold" value="N/A" readOnly />
                                </div>
                                <div>
                                  <Label className="text-[10px] text-gray-500 mb-0.5 block">Cash Distribution Payment Option</Label>
                                  <Input className="h-7 text-[11px] font-semibold" value="Default (N$M if eligible)" readOnly />
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* Cheque Information Section */}
                          <div className="bg-white rounded border border-gray-200 overflow-hidden">
                            <div className="bg-blue-600 text-white px-3 py-2">
                              <h4 className="text-xs font-semibold">Cheque Information</h4>
                            </div>
                            <div className="p-3">
                              <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-3">
                                  <div>
                                    <Label className="text-[10px] text-gray-500 mb-0.5 block">Cheque Paid To Client</Label>
                                    <Input className="h-7 text-[11px]" value="" readOnly />
                                  </div>
                                  <div>
                                    <Label className="text-[10px] text-gray-500 mb-0.5 block">City</Label>
                                    <Input className="h-7 text-[11px]" value="" readOnly />
                                  </div>
                                  <div>
                                    <Label className="text-[10px] text-gray-500 mb-0.5 block">Country</Label>
                                    <Input className="h-7 text-[11px]" value="" readOnly />
                                  </div>
                                </div>
                                <div className="space-y-3">
                                  <div>
                                    <Label className="text-[10px] text-gray-500 mb-0.5 block">No</Label>
                                    <Input className="h-7 text-[11px]" value="" readOnly />
                                  </div>
                                  <div>
                                    <Label className="text-[10px] text-gray-500 mb-0.5 block">Address</Label>
                                    <Input className="h-7 text-[11px]" value="" readOnly />
                                  </div>
                                  <div>
                                    <Label className="text-[10px] text-gray-500 mb-0.5 block">Province</Label>
                                    <Input className="h-7 text-[11px]" value="" readOnly />
                                  </div>
                                  <div>
                                    <Label className="text-[10px] text-gray-500 mb-0.5 block">Postal</Label>
                                    <Input className="h-7 text-[11px]" value="" readOnly />
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* EFT Information Section */}
                          <div className="bg-white rounded border border-gray-200 overflow-hidden">
                            <div className="bg-blue-600 text-white px-3 py-2">
                              <h4 className="text-xs font-semibold">EFT Information</h4>
                            </div>
                            <div className="p-3">
                              <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-3">
                                  <div>
                                    <Label className="text-[10px] text-gray-500 mb-0.5 block">Account Holder</Label>
                                    <Input className="h-7 text-[11px]" value="" readOnly />
                                  </div>
                                  <div>
                                    <Label className="text-[10px] text-gray-500 mb-0.5 block">Institution Number</Label>
                                    <Input className="h-7 text-[11px]" value="" readOnly />
                                  </div>
                                </div>
                                <div className="space-y-3">
                                  <div>
                                    <Label className="text-[10px] text-gray-500 mb-0.5 block">Transit Number</Label>
                                    <Input className="h-7 text-[11px]" value="" readOnly />
                                  </div>
                                  <div>
                                    <Label className="text-[10px] text-gray-500 mb-0.5 block">Account Number</Label>
                                    <Input className="h-7 text-[11px]" value="" readOnly />
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </TabsContent>
                      
                      <TabsContent value="notes" className="mt-4">
                        <div className="space-y-4">
                          <Button className="bg-green-600 hover:bg-green-700 text-white text-xs h-8">
                            New Transaction Note
                          </Button>
                          <div className="bg-gray-100 border border-gray-200 rounded p-8 min-h-[300px]">
                            {/* Empty notes area - notes will be displayed here */}
                          </div>
                        </div>
                      </TabsContent>
                      
                      <TabsContent value="attachments" className="mt-4">
                        <div className="space-y-4">
                          <div>
                            <h3 className="text-xs font-semibold text-gray-900 mb-2 pb-1 border-b-2 border-blue-600">Fund Transaction Attachments</h3>
                            <div className="flex items-center gap-2 mb-4">
                              <Button className="bg-green-600 hover:bg-green-700 text-white text-xs h-8">
                                Add New Attachment
                              </Button>
                              <Button className="bg-blue-600 hover:bg-blue-700 text-white text-xs h-8">
                                Link Existing Attachment
                              </Button>
                              <Button className="bg-blue-600 hover:bg-blue-700 text-white text-xs h-8">
                                Unlink Attachment
                              </Button>
                            </div>
                            <div className="space-y-2 mb-4">
                              <div className="flex items-center gap-2">
                                <Checkbox id="include-inactive-transaction-attachments" />
                                <Label htmlFor="include-inactive-transaction-attachments" className="text-[10px] text-gray-700 cursor-pointer">Include Inactive</Label>
                              </div>
                              <div className="flex items-center gap-2">
                                <Checkbox id="include-trust-transaction-attachments" />
                                <Label htmlFor="include-trust-transaction-attachments" className="text-[10px] text-gray-700 cursor-pointer">Include attachments from Trust Transactions</Label>
                              </div>
                            </div>
                          </div>
                          
                          <div>
                            <h4 className="text-xs font-semibold text-gray-900 mb-2 pb-1 border-b-2 border-blue-600">Attachments</h4>
                            <div className="py-8">
                              <p className="text-xs text-gray-500 text-center">No attachments found</p>
                            </div>
                          </div>
                        </div>
                      </TabsContent>
                      
                      <TabsContent value="reviews" className="mt-4">
                        <div className="space-y-4">
                          <Button className="bg-green-600 hover:bg-green-700 text-white text-xs h-8">
                            Add New Response
                          </Button>
                          <div>
                            <h3 className="text-xs font-semibold text-gray-900 mb-2 pb-1 border-b-2 border-blue-600">Reviews</h3>
                            <div className="py-8">
                              <p className="text-xs text-gray-500 italic text-center">No reviews found</p>
                            </div>
                          </div>
                        </div>
                      </TabsContent>
                      
                      <TabsContent value="related-transactions" className="mt-4">
                        <div className="space-y-4">
                          <div>
                            <h3 className="text-xs font-semibold text-gray-900 mb-2 pb-1 border-b-2 border-blue-600">Related Transactions</h3>
                            <div className="bg-blue-50 p-4 rounded border border-blue-200">
                              <div className="flex items-center gap-2 mb-4">
                                <Checkbox id="conversion" />
                                <Label htmlFor="conversion" className="text-[10px] text-gray-700 cursor-pointer">Conversion</Label>
                              </div>
                              <p className="text-xs text-gray-500 italic">No Related Transactions</p>
                            </div>
                          </div>
                        </div>
                      </TabsContent>
                    </Tabs>
                  </div>
                ) : selectedFundAccountData ? (
                  /* Fund Account Details */
                  <div className="space-y-4">
                    <Tabs defaultValue="details">
                      <TabsList className="grid w-full grid-cols-7 h-8 mb-4">
                        <TabsTrigger value="details" className="text-xs">Details</TabsTrigger>
                        <TabsTrigger value="tools" className="text-xs">Tools</TabsTrigger>
                        <TabsTrigger value="notes" className="text-xs">
                          Notes
                          <HelpCircle className="h-3 w-3 ml-1" />
                        </TabsTrigger>
                        <TabsTrigger value="attachments" className="text-xs">
                          Attachments
                          <HelpCircle className="h-3 w-3 ml-1" />
                        </TabsTrigger>
                        <TabsTrigger value="allocations" className="text-xs">
                          Allocations
                          <HelpCircle className="h-3 w-3 ml-1" />
                        </TabsTrigger>
                        <TabsTrigger value="product-documents-delivery" className="text-xs">
                          Product Documents Delivery
                          <HelpCircle className="h-3 w-3 ml-1" />
                        </TabsTrigger>
                        <TabsTrigger value="price-history" className="text-xs">
                          Price History
                          <HelpCircle className="h-3 w-3 ml-1" />
                        </TabsTrigger>
                      </TabsList>
                      
                      <TabsContent value="details" className="mt-4">
                        <div className="space-y-4">
                          <h3 className="text-xs font-semibold text-gray-900">Details</h3>
                          
                          {/* Product Information Section */}
                          <div className="bg-white p-3 rounded border border-gray-200">
                            <h4 className="text-xs font-semibold text-gray-900 mb-3 pb-1 border-b-2 border-blue-600">Product Information</h4>
                            <div className="grid grid-cols-2 gap-3">
                              <div>
                                <Label className="text-[10px] text-gray-500 mb-0.5 block">Product Code</Label>
                                <div className="flex items-center gap-2">
                                  <span className="text-xs text-blue-600 underline cursor-pointer">{selectedFundAccountData.productCode}</span>
                                  <Button size="sm" className="h-6 text-[10px] bg-blue-600 hover:bg-blue-700 text-white">
                                    View Fund Info
                                  </Button>
                                </div>
                              </div>
                              <div>
                                <Label className="text-[10px] text-gray-500 mb-0.5 block">Product Name</Label>
                                <Input className="h-7 text-[11px]" value={selectedFundAccountData.productName} readOnly />
                              </div>
                              <div>
                                <Label className="text-[10px] text-gray-500 mb-0.5 block">Supplier</Label>
                                <Input className="h-7 text-[11px]" value={selectedFundAccountData.supplier} readOnly />
                              </div>
                              <div>
                                <Label className="text-[10px] text-gray-500 mb-0.5 block">Category</Label>
                                <Input className="h-7 text-[11px]" value={selectedFundAccountData.category} readOnly />
                              </div>
                              <div>
                                <Label className="text-[10px] text-gray-500 mb-0.5 block">Risk</Label>
                                <Input className="h-7 text-[11px]" value={selectedFundAccountData.risk} readOnly />
                              </div>
                              <div>
                                <Label className="text-[10px] text-gray-500 mb-0.5 block">Investment Objective</Label>
                                <Input className="h-7 text-[11px]" value={selectedFundAccountData.investmentObjective} readOnly />
                              </div>
                            </div>
                          </div>

                          {/* Account & Rate Information Section */}
                          <div className="bg-white p-3 rounded border border-gray-200">
                            <h4 className="text-xs font-semibold text-gray-900 mb-3 pb-1 border-b-2 border-blue-600">Account & Rate Information</h4>
                            <div className="grid grid-cols-2 gap-3">
                              <div>
                                <Label className="text-[10px] text-gray-500 mb-0.5 block">Account Number</Label>
                                <Input className="h-7 text-[11px]" value={selectedFundAccountData.accountNumber} readOnly />
                              </div>
                              <div>
                                <Label className="text-[10px] text-gray-500 mb-0.5 block">Rate Type</Label>
                                <Input className="h-7 text-[11px]" value={selectedFundAccountData.rateType} readOnly />
                              </div>
                              <div>
                                <Label className="text-[10px] text-gray-500 mb-0.5 block">DSC Rate</Label>
                                <Input className="h-7 text-[11px]" value={selectedFundAccountData.dscRate} readOnly />
                              </div>
                              <div>
                                <Label className="text-[10px] text-gray-500 mb-0.5 block">FEL Max Rate</Label>
                                <Input className="h-7 text-[11px]" value={selectedFundAccountData.felMaxRate} readOnly />
                              </div>
                              <div>
                                <Label className="text-[10px] text-gray-500 mb-0.5 block">Distribution Option</Label>
                                <Select defaultValue={selectedFundAccountData.distributionOption.toLowerCase().replace(/\s+/g, '-')}>
                                  <SelectTrigger className="h-7 text-[11px]">
                                    <SelectValue />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="reinvest">Reinvest</SelectItem>
                                    <SelectItem value="cash">Cash</SelectItem>
                                  </SelectContent>
                                </Select>
                              </div>
                              <div>
                                <Label className="text-[10px] text-gray-500 mb-0.5 block">Certificate</Label>
                                <Select defaultValue={selectedFundAccountData.certificate.toLowerCase().replace(/\s+/g, '-')}>
                                  <SelectTrigger className="h-7 text-[11px]">
                                    <SelectValue />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="no-certificate">No Certificate</SelectItem>
                                    <SelectItem value="certificate">Certificate</SelectItem>
                                  </SelectContent>
                                </Select>
                              </div>
                            </div>
                          </div>

                          {/* Price & Share Information Section */}
                          <div className="bg-white p-3 rounded border border-gray-200">
                            <h4 className="text-xs font-semibold text-gray-900 mb-3 pb-1 border-b-2 border-blue-600">Price & Share Information</h4>
                            <div className="grid grid-cols-2 gap-3">
                              <div>
                                <Label className="text-[10px] text-gray-500 mb-0.5 block">Current Price</Label>
                                <Input className="h-7 text-[11px]" value={selectedFundAccountData.currentPrice} readOnly />
                              </div>
                              <div>
                                <Label className="text-[10px] text-gray-500 mb-0.5 block">Price Date</Label>
                                <Input className="h-7 text-[11px]" value={selectedFundAccountData.priceDate} readOnly />
                              </div>
                              <div>
                                <Label className="text-[10px] text-gray-500 mb-0.5 block">Total Shares Issued</Label>
                                <Input className="h-7 text-[11px]" value={selectedFundAccountData.totalSharesIssued} readOnly />
                              </div>
                              <div>
                                <Label className="text-[10px] text-gray-500 mb-0.5 block">Total Shares Unissued</Label>
                                <Input className="h-7 text-[11px]" value={selectedFundAccountData.totalSharesUnissued} readOnly />
                              </div>
                            </div>
                          </div>

                          {/* Date & Status Information Section */}
                          <div className="bg-white p-3 rounded border border-gray-200">
                            <h4 className="text-xs font-semibold text-gray-900 mb-3 pb-1 border-b-2 border-blue-600">Date & Status Information</h4>
                            <div className="grid grid-cols-2 gap-3">
                              <div>
                                <Label className="text-[10px] text-gray-500 mb-0.5 block">Start Date</Label>
                                <Input className="h-7 text-[11px]" value={selectedFundAccountData.startDate} readOnly />
                              </div>
                              <div>
                                <Label className="text-[10px] text-gray-500 mb-0.5 block">End Date</Label>
                                <Input className="h-7 text-[11px]" value={selectedFundAccountData.endDate || ""} readOnly />
                              </div>
                              <div>
                                <Label className="text-[10px] text-gray-500 mb-0.5 block">Effective Date</Label>
                                <Input className="h-7 text-[11px]" value={selectedFundAccountData.effectiveDate} readOnly />
                              </div>
                              <div>
                                <Label className="text-[10px] text-gray-500 mb-0.5 block">Last Sequence</Label>
                                <Input className="h-7 text-[11px]" value={selectedFundAccountData.lastSequence} readOnly />
                              </div>
                              <div className="flex items-center gap-2">
                                <Checkbox id="active" checked={selectedFundAccountData.active} />
                                <Label htmlFor="active" className="text-[10px] text-gray-500 cursor-pointer">Active</Label>
                              </div>
                              <div className="flex items-center gap-2">
                                <Checkbox id="exclude-duplicate" checked={selectedFundAccountData.excludeFromDuplicate} />
                                <Label htmlFor="exclude-duplicate" className="text-[10px] text-gray-500 cursor-pointer">Exclude from Duplicate exception reports</Label>
                              </div>
                            </div>
                          </div>
                        </div>
                      </TabsContent>
                      
                      <TabsContent value="tools" className="mt-4">
                        <div className="space-y-4">
                          {/* Market Value Calculator */}
                          <div className="bg-blue-50 rounded border border-blue-200">
                            <div className="bg-blue-600 text-white px-3 py-2 rounded-t">
                              <h3 className="text-xs font-semibold">Market Value Calculator</h3>
                            </div>
                            <div className="p-3 space-y-3">
                              <div>
                                <Label className="text-[10px] text-gray-500 mb-0.5 block">Current Market Value</Label>
                                <Input className="h-7 text-[11px]" value="$148.94" readOnly />
                              </div>
                              <div>
                                <Label className="text-[10px] text-gray-500 mb-0.5 block">Historical Market Value Target Date</Label>
                                <div className="flex items-center gap-2">
                                  <Input className="h-7 text-[11px]" value="12/19/2025" />
                                  <Calendar className="h-4 w-4 text-gray-500" />
                                </div>
                              </div>
                              <div className="flex items-center gap-2">
                                <Button size="sm" className="h-7 text-[10px] bg-blue-600 hover:bg-blue-700 text-white">
                                  Historical Market Value
                                </Button>
                                <div className="flex-1">
                                  <Label className="text-[10px] text-gray-500 mb-0.5 block">CAD</Label>
                                  <Input className="h-7 text-[11px]" value="$0.00" readOnly />
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* Share Balance Calculator */}
                          <div className="bg-blue-50 rounded border border-blue-200">
                            <div className="bg-blue-600 text-white px-3 py-2 rounded-t">
                              <h3 className="text-xs font-semibold">Share Balance Calculator</h3>
                            </div>
                            <div className="p-3 space-y-3">
                              <div>
                                <Label className="text-[10px] text-gray-500 mb-0.5 block">Current Share Balance</Label>
                                <Input className="h-7 text-[11px]" value="4.6920" readOnly />
                              </div>
                              <div>
                                <Label className="text-[10px] text-gray-500 mb-0.5 block">Historical Share Balance Target Date</Label>
                                <div className="flex items-center gap-2">
                                  <Input className="h-7 text-[11px]" value="12/19/2025" />
                                  <Calendar className="h-4 w-4 text-gray-500" />
                                </div>
                              </div>
                              <div className="flex items-center gap-2">
                                <Button size="sm" className="h-7 text-[10px] bg-blue-600 hover:bg-blue-700 text-white">
                                  Calculate Historical Share Balance
                                </Button>
                                <div className="flex-1">
                                  <Label className="text-[10px] text-gray-500 mb-0.5 block">Historical Share Balance</Label>
                                  <Input className="h-7 text-[11px]" value="0.0000" readOnly />
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* Adjusted Cost Base Calculator */}
                          <div className="bg-blue-50 rounded border border-blue-200">
                            <div className="bg-blue-600 text-white px-3 py-2 rounded-t">
                              <h3 className="text-xs font-semibold">Adjusted Cost Base (Book Value) Calculator</h3>
                            </div>
                            <div className="p-3">
                              <div className="flex items-center gap-2">
                                <Button size="sm" className="h-7 text-[10px] bg-blue-600 hover:bg-blue-700 text-white">
                                  Adjusted Cost Base
                                </Button>
                                <div className="flex-1">
                                  <Input className="h-7 text-[11px]" value="$0.00" readOnly />
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* Rate Of Return Calculator */}
                          <div className="bg-blue-50 rounded border border-blue-200">
                            <div className="bg-blue-600 text-white px-3 py-2 rounded-t">
                              <h3 className="text-xs font-semibold">Rate Of Return Calculator</h3>
                            </div>
                            <div className="p-3 space-y-3">
                              <div className="flex items-center gap-2">
                                <Checkbox id="since-inception" />
                                <Label htmlFor="since-inception" className="text-[10px] text-gray-500 cursor-pointer">Since Inception</Label>
                              </div>
                              <div>
                                <Label className="text-[10px] text-gray-500 mb-0.5 block">Rate of Return Start Date</Label>
                                <div className="flex items-center gap-2">
                                  <Input className="h-7 text-[11px]" value="12/19/2025" />
                                  <Calendar className="h-4 w-4 text-gray-500" />
                                </div>
                              </div>
                              <div>
                                <Label className="text-[10px] text-gray-500 mb-0.5 block">Rate of Return End Date</Label>
                                <div className="flex items-center gap-2">
                                  <Input className="h-7 text-[11px]" value="12/19/2025" />
                                  <Calendar className="h-4 w-4 text-gray-500" />
                                </div>
                              </div>
                              <div className="flex items-center gap-2">
                                <Button size="sm" className="h-7 text-[10px] bg-blue-600 hover:bg-blue-700 text-white">
                                  Rate of Return
                                </Button>
                                <div className="flex-1">
                                  <Label className="text-[10px] text-gray-500 mb-0.5 block">XIRR Rate of Return</Label>
                                  <Input className="h-7 text-[11px]" value="0.00000 %" readOnly />
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* Other Section */}
                          <div className="bg-blue-50 rounded border border-blue-200">
                            <div className="bg-blue-600 text-white px-3 py-2 rounded-t">
                              <h3 className="text-xs font-semibold">Other</h3>
                            </div>
                            <div className="p-3 flex gap-2">
                              <Button size="sm" className="h-7 text-[10px] bg-blue-600 hover:bg-blue-700 text-white">
                                Fund Alerts
                              </Button>
                              <Button size="sm" className="h-7 text-[10px] bg-blue-600 hover:bg-blue-700 text-white">
                                Start KYP Review
                              </Button>
                            </div>
                          </div>

                          {/* Redemption Calculator */}
                          <div className="bg-blue-50 rounded border border-blue-200">
                            <div className="bg-blue-600 text-white px-3 py-2 rounded-t">
                              <h3 className="text-xs font-semibold">Redemption Calculator</h3>
                            </div>
                            <div className="p-3 space-y-3">
                              <div>
                                <Label className="text-[10px] text-gray-500 mb-0.5 block">Gross Amount</Label>
                                <Input className="h-7 text-[11px]" value="$0.00" />
                              </div>
                              <div>
                                <Label className="text-[10px] text-gray-500 mb-0.5 block">Withholding Tax Rate</Label>
                                <p className="text-[10px] text-gray-700">Auto calculated.</p>
                              </div>
                              <div>
                                <Label className="text-[10px] text-gray-500 mb-0.5 block">Fee</Label>
                                <Select defaultValue="partial-redemption">
                                  <SelectTrigger className="h-7 text-[11px]">
                                    <SelectValue />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="partial-redemption">Partial Redemption: $50.00 + Tax</SelectItem>
                                    <SelectItem value="full-redemption">Full Redemption: $0.00</SelectItem>
                                  </SelectContent>
                                </Select>
                              </div>
                              <div>
                                <Label className="text-[10px] text-gray-500 mb-0.5 block">Provincial Tax</Label>
                                <Select defaultValue="ontario">
                                  <SelectTrigger className="h-7 text-[11px]">
                                    <SelectValue />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="ontario">ONTARIO 13.0%</SelectItem>
                                    <SelectItem value="quebec">QUEBEC 14.975%</SelectItem>
                                    <SelectItem value="bc">BRITISH COLUMBIA 12.0%</SelectItem>
                                  </SelectContent>
                                </Select>
                              </div>
                              <div>
                                <Label className="text-[10px] text-gray-500 mb-0.5 block">Net Amount</Label>
                                <Input className="h-7 text-[11px]" value="$0.00" readOnly />
                              </div>
                              <div className="flex gap-2">
                                <Button size="sm" className="h-7 text-[10px] bg-blue-600 hover:bg-blue-700 text-white flex-1">
                                  Calculate Net Amount
                                </Button>
                                <Button size="sm" className="h-7 text-[10px] bg-blue-600 hover:bg-blue-700 text-white flex-1">
                                  Calculate Gross Amount
                                </Button>
                              </div>
                              <p className="text-[9px] text-gray-500 italic mt-2">
                                *Calculator only valid for clients residing in provinces your dealership is registered to service.
                              </p>
                            </div>
                          </div>
                        </div>
                      </TabsContent>
                      
                      <TabsContent value="notes" className="mt-4">
                        <div className="space-y-4">
                          <h3 className="text-xs font-semibold text-gray-900">Notes</h3>
                          <Button className="bg-green-600 hover:bg-green-700 text-white text-xs h-8">
                            New Fund Account Note
                          </Button>
                          <div className="bg-gray-100 border border-gray-200 rounded p-8 min-h-[200px]">
                            {/* Empty notes area - notes will be displayed here */}
                          </div>
                        </div>
                      </TabsContent>
                      
                      <TabsContent value="attachments" className="mt-4">
                        <div className="space-y-4">
                          <div>
                            <h3 className="text-xs font-semibold text-gray-900 mb-2 pb-1 border-b-2 border-blue-600">Fund Account Attachments</h3>
                            <div className="flex items-center gap-2 mb-4">
                              <Button className="bg-green-600 hover:bg-green-700 text-white text-xs h-8">
                                Add New Attachment
                              </Button>
                              <Button className="bg-blue-600 hover:bg-blue-700 text-white text-xs h-8">
                                Link Existing Attachment
                              </Button>
                              <Button className="bg-blue-600 hover:bg-blue-700 text-white text-xs h-8">
                                Unlink Attachment
                              </Button>
                            </div>
                            <div className="space-y-2 mb-4">
                              <div className="flex items-center gap-2">
                                <Checkbox id="include-inactive-attachments" />
                                <Label htmlFor="include-inactive-attachments" className="text-[10px] text-gray-700 cursor-pointer">Include Inactive</Label>
                              </div>
                              <div className="flex items-center gap-2">
                                <Checkbox id="include-transaction-attachments" />
                                <Label htmlFor="include-transaction-attachments" className="text-[10px] text-gray-700 cursor-pointer">Include attachments from Transactions and Trust Transactions</Label>
                              </div>
                            </div>
                          </div>
                          
                          <div>
                            <h4 className="text-xs font-semibold text-gray-900 mb-2 pb-1 border-b-2 border-blue-600">Attachments</h4>
                            <div className="py-8">
                              <p className="text-xs text-gray-500 text-center">No attachments found</p>
                            </div>
                          </div>
                        </div>
                      </TabsContent>
                      
                      <TabsContent value="allocations" className="mt-4">
                        <div className="space-y-4">
                          <Tabs value={fundAccountAllocationsView} onValueChange={(value) => setFundAccountAllocationsView(value as "chart" | "table")}>
                            <TabsList className="grid w-full grid-cols-2 h-8 mb-4">
                              <TabsTrigger value="chart" className="text-xs">Allocations (Chart)</TabsTrigger>
                              <TabsTrigger value="table" className="text-xs">Allocations (Table)</TabsTrigger>
                            </TabsList>
                            
                            <TabsContent value="chart" className="mt-4">
                              <div className="grid grid-cols-3 gap-4">
                                {/* Geographic Allocation */}
                                <div className="bg-white p-4 rounded border border-gray-200">
                                  <h4 className="text-xs font-semibold text-gray-900 mb-4 text-center">Geographic Allocation</h4>
                                  <ResponsiveContainer width="100%" height={200}>
                                    <PieChart>
                                      <Pie
                                        data={[
                                          { name: "United States", value: 53.38, color: "#FFC107" },
                                          { name: "Canada", value: 35.58, color: "#F44336" },
                                          { name: "European Union", value: 3.93, color: "#4CAF50" },
                                          { name: "Multi-National", value: 3.38, color: "#2196F3" },
                                          { name: "Asia/Pacific Rim", value: 2.57, color: "#E91E63" },
                                          { name: "All others", value: 1.16, color: "#9E9E9E" },
                                        ]}
                                        cx="50%"
                                        cy="50%"
                                        outerRadius={70}
                                        fill="#8884d8"
                                        dataKey="value"
                                        label={false}
                                      >
                                        <Cell fill="#FFC107" />
                                        <Cell fill="#F44336" />
                                        <Cell fill="#4CAF50" />
                                        <Cell fill="#2196F3" />
                                        <Cell fill="#E91E63" />
                                        <Cell fill="#9E9E9E" />
                                      </Pie>
                                      <RechartsTooltip />
                                    </PieChart>
                                  </ResponsiveContainer>
                                  <div className="mt-4 space-y-1">
                                    <div className="flex items-center gap-2 text-[10px]">
                                      <div className="w-3 h-3 rounded" style={{ backgroundColor: "#FFC107" }}></div>
                                      <span className="text-gray-700">United States</span>
                                      <span className="ml-auto text-gray-500">53.38%</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-[10px]">
                                      <div className="w-3 h-3 rounded" style={{ backgroundColor: "#F44336" }}></div>
                                      <span className="text-gray-700">Canada</span>
                                      <span className="ml-auto text-gray-500">35.58%</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-[10px]">
                                      <div className="w-3 h-3 rounded" style={{ backgroundColor: "#4CAF50" }}></div>
                                      <span className="text-gray-700">European Union</span>
                                      <span className="ml-auto text-gray-500">3.93%</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-[10px]">
                                      <div className="w-3 h-3 rounded" style={{ backgroundColor: "#2196F3" }}></div>
                                      <span className="text-gray-700">Multi-National</span>
                                      <span className="ml-auto text-gray-500">3.38%</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-[10px]">
                                      <div className="w-3 h-3 rounded" style={{ backgroundColor: "#E91E63" }}></div>
                                      <span className="text-gray-700">Asia/Pacific Rim</span>
                                      <span className="ml-auto text-gray-500">2.57%</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-[10px]">
                                      <div className="w-3 h-3 rounded" style={{ backgroundColor: "#9E9E9E" }}></div>
                                      <span className="text-gray-700">All others</span>
                                      <span className="ml-auto text-gray-500">1.16%</span>
                                    </div>
                                  </div>
                                </div>
                                
                                {/* Asset Allocation */}
                                <div className="bg-white p-4 rounded border border-gray-200">
                                  <h4 className="text-xs font-semibold text-gray-900 mb-4 text-center">Asset Allocation</h4>
                                  <ResponsiveContainer width="100%" height={200}>
                                    <PieChart>
                                      <Pie
                                        data={[
                                          { name: "US Equity", value: 27.34, color: "#03A9F4" },
                                          { name: "Foreign Bonds", value: 25.86, color: "#3F51B5" },
                                          { name: "Canadian Equity", value: 14.88, color: "#E91E63" },
                                          { name: "Domestic Bonds", value: 9.90, color: "#4CAF50" },
                                          { name: "Income Trust Units", value: 9.41, color: "#FFC107" },
                                          { name: "International Equity", value: 4.77, color: "#F44336" },
                                          { name: "Cash and Equivalents", value: 4.54, color: "#FF9800" },
                                          { name: "Other", value: 3.30, color: "#9E9E9E" },
                                        ]}
                                        cx="50%"
                                        cy="50%"
                                        outerRadius={70}
                                        fill="#8884d8"
                                        dataKey="value"
                                        label={false}
                                      >
                                        <Cell fill="#03A9F4" />
                                        <Cell fill="#3F51B5" />
                                        <Cell fill="#E91E63" />
                                        <Cell fill="#4CAF50" />
                                        <Cell fill="#FFC107" />
                                        <Cell fill="#F44336" />
                                        <Cell fill="#FF9800" />
                                        <Cell fill="#9E9E9E" />
                                      </Pie>
                                      <RechartsTooltip />
                                    </PieChart>
                                  </ResponsiveContainer>
                                  <div className="mt-4 space-y-1">
                                    <div className="flex items-center gap-2 text-[10px]">
                                      <div className="w-3 h-3 rounded" style={{ backgroundColor: "#03A9F4" }}></div>
                                      <span className="text-gray-700">US Equity</span>
                                      <span className="ml-auto text-gray-500">27.34%</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-[10px]">
                                      <div className="w-3 h-3 rounded" style={{ backgroundColor: "#3F51B5" }}></div>
                                      <span className="text-gray-700">Foreign Bonds</span>
                                      <span className="ml-auto text-gray-500">25.86%</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-[10px]">
                                      <div className="w-3 h-3 rounded" style={{ backgroundColor: "#E91E63" }}></div>
                                      <span className="text-gray-700">Canadian Equity</span>
                                      <span className="ml-auto text-gray-500">14.88%</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-[10px]">
                                      <div className="w-3 h-3 rounded" style={{ backgroundColor: "#4CAF50" }}></div>
                                      <span className="text-gray-700">Domestic Bonds</span>
                                      <span className="ml-auto text-gray-500">9.90%</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-[10px]">
                                      <div className="w-3 h-3 rounded" style={{ backgroundColor: "#FFC107" }}></div>
                                      <span className="text-gray-700">Income Trust Units</span>
                                      <span className="ml-auto text-gray-500">9.41%</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-[10px]">
                                      <div className="w-3 h-3 rounded" style={{ backgroundColor: "#F44336" }}></div>
                                      <span className="text-gray-700">International Equity</span>
                                      <span className="ml-auto text-gray-500">4.77%</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-[10px]">
                                      <div className="w-3 h-3 rounded" style={{ backgroundColor: "#FF9800" }}></div>
                                      <span className="text-gray-700">Cash and Equivalents</span>
                                      <span className="ml-auto text-gray-500">4.54%</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-[10px]">
                                      <div className="w-3 h-3 rounded" style={{ backgroundColor: "#9E9E9E" }}></div>
                                      <span className="text-gray-700">Other</span>
                                      <span className="ml-auto text-gray-500">3.30%</span>
                                    </div>
                                  </div>
                                </div>
                                
                                {/* Sector Allocation */}
                                <div className="bg-white p-4 rounded border border-gray-200">
                                  <h4 className="text-xs font-semibold text-gray-900 mb-4 text-center">Sector Allocation</h4>
                                  <ResponsiveContainer width="100%" height={200}>
                                    <PieChart>
                                      <Pie
                                        data={[
                                          { name: "Fixed Income", value: 35.61, color: "#E91E63" },
                                          { name: "Real Estate", value: 22.78, color: "#F44336" },
                                          { name: "Energy", value: 13.14, color: "#E91E63" },
                                          { name: "Financial Services", value: 7.67, color: "#3F51B5" },
                                          { name: "Utilities", value: 6.18, color: "#4CAF50" },
                                          { name: "Cash and Cash Equivalent", value: 4.54, color: "#FFC107" },
                                          { name: "Mutual Fund", value: 3.43, color: "#4CAF50" },
                                          { name: "Industrial Services", value: 2.41, color: "#FF9800" },
                                          { name: "Telecommunications", value: 2.29, color: "#E91E63" },
                                          { name: "All others", value: 1.95, color: "#9E9E9E" },
                                        ]}
                                        cx="50%"
                                        cy="50%"
                                        outerRadius={70}
                                        fill="#8884d8"
                                        dataKey="value"
                                        label={false}
                                      >
                                        <Cell fill="#E91E63" />
                                        <Cell fill="#F44336" />
                                        <Cell fill="#E91E63" />
                                        <Cell fill="#3F51B5" />
                                        <Cell fill="#4CAF50" />
                                        <Cell fill="#FFC107" />
                                        <Cell fill="#4CAF50" />
                                        <Cell fill="#FF9800" />
                                        <Cell fill="#E91E63" />
                                        <Cell fill="#9E9E9E" />
                                      </Pie>
                                      <RechartsTooltip />
                                    </PieChart>
                                  </ResponsiveContainer>
                                  <div className="mt-4 space-y-1">
                                    <div className="flex items-center gap-2 text-[10px]">
                                      <div className="w-3 h-3 rounded" style={{ backgroundColor: "#E91E63" }}></div>
                                      <span className="text-gray-700">Fixed Income</span>
                                      <span className="ml-auto text-gray-500">35.61%</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-[10px]">
                                      <div className="w-3 h-3 rounded" style={{ backgroundColor: "#F44336" }}></div>
                                      <span className="text-gray-700">Real Estate</span>
                                      <span className="ml-auto text-gray-500">22.78%</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-[10px]">
                                      <div className="w-3 h-3 rounded" style={{ backgroundColor: "#E91E63" }}></div>
                                      <span className="text-gray-700">Energy</span>
                                      <span className="ml-auto text-gray-500">13.14%</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-[10px]">
                                      <div className="w-3 h-3 rounded" style={{ backgroundColor: "#3F51B5" }}></div>
                                      <span className="text-gray-700">Financial Services</span>
                                      <span className="ml-auto text-gray-500">7.67%</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-[10px]">
                                      <div className="w-3 h-3 rounded" style={{ backgroundColor: "#4CAF50" }}></div>
                                      <span className="text-gray-700">Utilities</span>
                                      <span className="ml-auto text-gray-500">6.18%</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-[10px]">
                                      <div className="w-3 h-3 rounded" style={{ backgroundColor: "#FFC107" }}></div>
                                      <span className="text-gray-700">Cash and Cash Equivalent</span>
                                      <span className="ml-auto text-gray-500">4.54%</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-[10px]">
                                      <div className="w-3 h-3 rounded" style={{ backgroundColor: "#4CAF50" }}></div>
                                      <span className="text-gray-700">Mutual Fund</span>
                                      <span className="ml-auto text-gray-500">3.43%</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-[10px]">
                                      <div className="w-3 h-3 rounded" style={{ backgroundColor: "#FF9800" }}></div>
                                      <span className="text-gray-700">Industrial Services</span>
                                      <span className="ml-auto text-gray-500">2.41%</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-[10px]">
                                      <div className="w-3 h-3 rounded" style={{ backgroundColor: "#E91E63" }}></div>
                                      <span className="text-gray-700">Telecommunications</span>
                                      <span className="ml-auto text-gray-500">2.29%</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-[10px]">
                                      <div className="w-3 h-3 rounded" style={{ backgroundColor: "#9E9E9E" }}></div>
                                      <span className="text-gray-700">All others</span>
                                      <span className="ml-auto text-gray-500">1.95%</span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </TabsContent>
                            
                            <TabsContent value="table" className="mt-4">
                              <div className="space-y-4">
                                {/* Geographic Allocation */}
                                <div className="bg-white rounded border border-gray-200 overflow-hidden">
                                  <div className="bg-gray-100 px-3 py-2 border-b border-gray-200">
                                    <h4 className="text-xs font-semibold text-gray-900 border-b-2 border-blue-600 pb-1 inline-block">Geographic Allocation</h4>
                                  </div>
                                  <Table>
                                    <TableBody>
                                      <TableRow className="bg-white">
                                        <TableCell className="text-xs py-2 px-3 text-gray-900">United States</TableCell>
                                        <TableCell className="text-xs py-2 px-3 text-right text-gray-900">53.38%</TableCell>
                                      </TableRow>
                                      <TableRow className="bg-gray-50">
                                        <TableCell className="text-xs py-2 px-3 text-gray-900">Canada</TableCell>
                                        <TableCell className="text-xs py-2 px-3 text-right text-gray-900">35.58%</TableCell>
                                      </TableRow>
                                      <TableRow className="bg-white">
                                        <TableCell className="text-xs py-2 px-3 text-gray-900">European Union</TableCell>
                                        <TableCell className="text-xs py-2 px-3 text-right text-gray-900">3.93%</TableCell>
                                      </TableRow>
                                      <TableRow className="bg-gray-50">
                                        <TableCell className="text-xs py-2 px-3 text-gray-900">Multi-National</TableCell>
                                        <TableCell className="text-xs py-2 px-3 text-right text-gray-900">3.38%</TableCell>
                                      </TableRow>
                                      <TableRow className="bg-white">
                                        <TableCell className="text-xs py-2 px-3 text-gray-900">Asia/Pacific Rim</TableCell>
                                        <TableCell className="text-xs py-2 px-3 text-right text-gray-900">2.57%</TableCell>
                                      </TableRow>
                                      <TableRow className="bg-gray-50">
                                        <TableCell className="text-xs py-2 px-3 text-gray-900">Japan</TableCell>
                                        <TableCell className="text-xs py-2 px-3 text-right text-gray-900">0.47%</TableCell>
                                      </TableRow>
                                      <TableRow className="bg-white">
                                        <TableCell className="text-xs py-2 px-3 text-gray-900">Other</TableCell>
                                        <TableCell className="text-xs py-2 px-3 text-right text-gray-900">-0.10%</TableCell>
                                      </TableRow>
                                    </TableBody>
                                  </Table>
                                </div>

                                {/* Asset Allocation */}
                                <div className="bg-white rounded border border-gray-200 overflow-hidden">
                                  <div className="bg-gray-100 px-3 py-2 border-b border-gray-200">
                                    <h4 className="text-xs font-semibold text-gray-900 border-b-2 border-blue-600 pb-1 inline-block">Asset Allocation</h4>
                                  </div>
                                  <Table>
                                    <TableBody>
                                      <TableRow className="bg-white">
                                        <TableCell className="text-xs py-2 px-3 text-gray-900">US Equity</TableCell>
                                        <TableCell className="text-xs py-2 px-3 text-right text-gray-900">27.34%</TableCell>
                                      </TableRow>
                                      <TableRow className="bg-gray-50">
                                        <TableCell className="text-xs py-2 px-3 text-gray-900">Foreign Bonds</TableCell>
                                        <TableCell className="text-xs py-2 px-3 text-right text-gray-900">25.86%</TableCell>
                                      </TableRow>
                                      <TableRow className="bg-white">
                                        <TableCell className="text-xs py-2 px-3 text-gray-900">Canadian Equity</TableCell>
                                        <TableCell className="text-xs py-2 px-3 text-right text-gray-900">14.88%</TableCell>
                                      </TableRow>
                                      <TableRow className="bg-gray-50">
                                        <TableCell className="text-xs py-2 px-3 text-gray-900">Domestic Bonds</TableCell>
                                        <TableCell className="text-xs py-2 px-3 text-right text-gray-900">9.90%</TableCell>
                                      </TableRow>
                                      <TableRow className="bg-white">
                                        <TableCell className="text-xs py-2 px-3 text-gray-900">Income Trust Units</TableCell>
                                        <TableCell className="text-xs py-2 px-3 text-right text-gray-900">9.41%</TableCell>
                                      </TableRow>
                                      <TableRow className="bg-gray-50">
                                        <TableCell className="text-xs py-2 px-3 text-gray-900">International Equity</TableCell>
                                        <TableCell className="text-xs py-2 px-3 text-right text-gray-900">4.77%</TableCell>
                                      </TableRow>
                                      <TableRow className="bg-white">
                                        <TableCell className="text-xs py-2 px-3 text-gray-900">Cash and Equivalents</TableCell>
                                        <TableCell className="text-xs py-2 px-3 text-right text-gray-900">4.54%</TableCell>
                                      </TableRow>
                                      <TableRow className="bg-gray-50">
                                        <TableCell className="text-xs py-2 px-3 text-gray-900">Other</TableCell>
                                        <TableCell className="text-xs py-2 px-3 text-right text-gray-900">3.30%</TableCell>
                                      </TableRow>
                                    </TableBody>
                                  </Table>
                                </div>

                                {/* Sector Allocation */}
                                <div className="bg-white rounded border border-gray-200 overflow-hidden">
                                  <div className="bg-gray-100 px-3 py-2 border-b border-gray-200">
                                    <h4 className="text-xs font-semibold text-gray-900 border-b-2 border-blue-600 pb-1 inline-block">Sector Allocation</h4>
                                  </div>
                                  <Table>
                                    <TableBody>
                                      <TableRow className="bg-white">
                                        <TableCell className="text-xs py-2 px-3 text-gray-900">Fixed Income</TableCell>
                                        <TableCell className="text-xs py-2 px-3 text-right text-gray-900">35.61%</TableCell>
                                      </TableRow>
                                      <TableRow className="bg-gray-50">
                                        <TableCell className="text-xs py-2 px-3 text-gray-900">Real Estate</TableCell>
                                        <TableCell className="text-xs py-2 px-3 text-right text-gray-900">22.78%</TableCell>
                                      </TableRow>
                                      <TableRow className="bg-white">
                                        <TableCell className="text-xs py-2 px-3 text-gray-900">Energy</TableCell>
                                        <TableCell className="text-xs py-2 px-3 text-right text-gray-900">13.14%</TableCell>
                                      </TableRow>
                                      <TableRow className="bg-gray-50">
                                        <TableCell className="text-xs py-2 px-3 text-gray-900">Financial Services</TableCell>
                                        <TableCell className="text-xs py-2 px-3 text-right text-gray-900">7.67%</TableCell>
                                      </TableRow>
                                      <TableRow className="bg-white">
                                        <TableCell className="text-xs py-2 px-3 text-gray-900">Utilities</TableCell>
                                        <TableCell className="text-xs py-2 px-3 text-right text-gray-900">6.18%</TableCell>
                                      </TableRow>
                                      <TableRow className="bg-gray-50">
                                        <TableCell className="text-xs py-2 px-3 text-gray-900">Cash and Cash Equivalent</TableCell>
                                        <TableCell className="text-xs py-2 px-3 text-right text-gray-900">4.54%</TableCell>
                                      </TableRow>
                                      <TableRow className="bg-white">
                                        <TableCell className="text-xs py-2 px-3 text-gray-900">Mutual Fund</TableCell>
                                        <TableCell className="text-xs py-2 px-3 text-right text-gray-900">3.43%</TableCell>
                                      </TableRow>
                                      <TableRow className="bg-gray-50">
                                        <TableCell className="text-xs py-2 px-3 text-gray-900">Industrial Services</TableCell>
                                        <TableCell className="text-xs py-2 px-3 text-right text-gray-900">2.41%</TableCell>
                                      </TableRow>
                                      <TableRow className="bg-white">
                                        <TableCell className="text-xs py-2 px-3 text-gray-900">Telecommunications</TableCell>
                                        <TableCell className="text-xs py-2 px-3 text-right text-gray-900">2.29%</TableCell>
                                      </TableRow>
                                      <TableRow className="bg-gray-50">
                                        <TableCell className="text-xs py-2 px-3 text-gray-900">Other</TableCell>
                                        <TableCell className="text-xs py-2 px-3 text-right text-gray-900">-0.05%</TableCell>
                                      </TableRow>
                                    </TableBody>
                                  </Table>
                                </div>
                              </div>
                            </TabsContent>
                          </Tabs>
                        </div>
                      </TabsContent>
                      
                      <TabsContent value="product-documents-delivery" className="mt-4">
                        <div className="bg-white rounded border border-gray-200 overflow-hidden">
                          <Table>
                            <TableHeader>
                              <TableRow className="bg-gray-100">
                                <TableHead className="text-xs font-semibold text-gray-900 py-2 px-3">
                                  <div className="flex items-center gap-1">
                                    <span className="text-blue-600">Delivery Date</span>
                                    <ChevronUp className="h-3 w-3 text-blue-600" />
                                  </div>
                                </TableHead>
                                <TableHead className="text-xs font-semibold text-gray-900 py-2 px-3">Delivery Type</TableHead>
                                <TableHead className="text-xs font-semibold text-gray-900 py-2 px-3">Document Type</TableHead>
                              </TableRow>
                            </TableHeader>
                            <TableBody>
                              <TableRow>
                                <TableCell colSpan={3} className="text-center py-8">
                                  <p className="text-xs text-gray-500">No product document delivery history</p>
                                </TableCell>
                              </TableRow>
                            </TableBody>
                          </Table>
                        </div>
                      </TabsContent>
                      
                      <TabsContent value="price-history" className="mt-4">
                        <div className="space-y-4">
                          {/* Price History Chart */}
                          <div className="bg-white p-4 rounded border border-gray-200">
                            <ResponsiveContainer width="100%" height={300}>
                              <LineChart
                                data={[
                                  { date: "1996-01-01", price: 8.00 },
                                  { date: "2001-01-01", price: 5.00 },
                                  { date: "2006-01-01", price: 2.00 },
                                  { date: "2011-01-01", price: 0.00 },
                                  { date: "2016-01-01", price: -2.00 },
                                  { date: "2021-01-01", price: -5.00 },
                                  { date: "2026-01-01", price: -8.00 },
                                ]}
                                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                              >
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis 
                                  dataKey="date" 
                                  tick={{ fontSize: 10 }}
                                  tickFormatter={(value) => {
                                    const date = new Date(value);
                                    return `Jan 1 ${date.getFullYear().toString().slice(-2)}`;
                                  }}
                                />
                                <YAxis 
                                  tick={{ fontSize: 10 }}
                                  tickFormatter={(value) => `$${value.toFixed(2)}`}
                                />
                                <RechartsTooltip />
                                <Line 
                                  type="monotone" 
                                  dataKey="price" 
                                  stroke="#3B82F6" 
                                  strokeWidth={2}
                                  dot={false}
                                />
                              </LineChart>
                            </ResponsiveContainer>
                            <p className="text-[9px] text-gray-500 italic mt-2">
                              * This chart shows price history only, and does not include any gains due to dividend/interest distributions.
                            </p>
                          </div>

                          {/* Price List Section */}
                          <div className="bg-white p-4 rounded border border-gray-200">
                            <h4 className="text-xs font-semibold text-gray-900 mb-4">Price List</h4>
                            <div className="space-y-3">
                              <div className="grid grid-cols-2 gap-4">
                                <div>
                                  <Label className="text-[10px] text-gray-500 mb-0.5 block">Start Date</Label>
                                  <div className="relative">
                                    <Input className="h-7 text-[11px] pr-8" value="12/19/2025" />
                                    <Calendar className="absolute right-2 top-1/2 transform -translate-y-1/2 h-3 w-3 text-gray-500" />
                                  </div>
                                </div>
                                <div>
                                  <Label className="text-[10px] text-gray-500 mb-0.5 block">End Date</Label>
                                  <div className="relative">
                                    <Input className="h-7 text-[11px] pr-8" value="12/19/2025" />
                                    <Calendar className="absolute right-2 top-1/2 transform -translate-y-1/2 h-3 w-3 text-gray-500" />
                                  </div>
                                </div>
                              </div>
                              <Button className="bg-blue-600 hover:bg-blue-700 text-white text-xs h-7">
                                List Prices
                              </Button>
                              <div className="py-4">
                                <p className="text-xs text-gray-500 text-center">No prices found within the given date range.</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </TabsContent>
                    </Tabs>
                  </div>
                ) : (
                  /* Plan Details */
                  <Tabs value={planDetailTab} onValueChange={setPlanDetailTab}>
                  <TabsList className="grid w-full grid-cols-6 h-8">
                    <TabsTrigger value="details" className="text-xs">Details</TabsTrigger>
                    <TabsTrigger value="kyc" className="text-xs">KYC</TabsTrigger>
                    <TabsTrigger value="beneficiaries" className="text-xs">Beneficiaries</TabsTrigger>
                    <TabsTrigger value="actions" className="text-xs">Actions</TabsTrigger>
                    <TabsTrigger value="trust-account" className="text-xs">Trust Account</TabsTrigger>
                    <TabsTrigger value="reviews" className="text-xs">Reviews</TabsTrigger>
                  </TabsList>

                  <TabsContent value="details" className="mt-4">
                    {/* Details Sub-tabs */}
                    <Tabs value={planDetailsSubTab} onValueChange={setPlanDetailsSubTab}>
                      <TabsList className="grid w-full grid-cols-6 h-8 mb-4">
                        <TabsTrigger value="details" className="text-xs">
                          Details
                          <HelpCircle className="h-3 w-3 ml-1" />
                        </TabsTrigger>
                        <TabsTrigger value="notes" className="text-xs">Notes</TabsTrigger>
                        <TabsTrigger value="plan-attachments" className="text-xs">Plan Attachments</TabsTrigger>
                        <TabsTrigger value="allocations" className="text-xs">Allocations</TabsTrigger>
                        <TabsTrigger value="supplier-accounts" className="text-xs">Supplier Accounts</TabsTrigger>
                        <TabsTrigger value="custom-compensation" className="text-xs">Custom Compensation</TabsTrigger>
                      </TabsList>

                      <TabsContent value="details" className="mt-4">
                        <div className="grid grid-cols-2 gap-4">
                          {/* Left Column */}
                          <div className="space-y-3">
                            {/* Plan Information */}
                            <div className="bg-white p-3 rounded border border-gray-200">
                              <h3 className="text-xs font-semibold text-gray-900 mb-2 pb-1 border-b-2 border-blue-600">Plan Information</h3>
                              <div className="grid grid-cols-2 gap-2">
                                <div>
                                  <Label className="text-[10px] text-gray-500 mb-0.5 block">ID</Label>
                                  <Input className="h-7 text-[11px]" value={selectedPlanData.accountNumber} readOnly />
                                </div>
                                <div>
                                  <Label className="text-[10px] text-gray-500 mb-0.5 block">Type</Label>
                                  <Select defaultValue={selectedPlanData.type.toLowerCase()}>
                                    <SelectTrigger className="h-7 text-[11px]">
                                      <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                      <SelectItem value="rrsp">RRSP</SelectItem>
                                      <SelectItem value="tfsa">TFSA</SelectItem>
                                      <SelectItem value="resp">RESP</SelectItem>
                                      <SelectItem value="rrif">RRIF</SelectItem>
                                    </SelectContent>
                                  </Select>
                                </div>
                                <div>
                                  <Label className="text-[10px] text-gray-500 mb-0.5 block">Account Designation</Label>
                                  <Select defaultValue="client-name">
                                    <SelectTrigger className="h-7 text-[11px]">
                                      <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                      <SelectItem value="client-name">Client Name</SelectItem>
                                      <SelectItem value="joint">Joint</SelectItem>
                                    </SelectContent>
                                  </Select>
                                </div>
                                <div>
                                  <Label className="text-[10px] text-gray-500 mb-0.5 block">Current Representative</Label>
                                  <p className="text-[11px] text-blue-600 underline cursor-pointer">9823-2232 Marsh, Antoine</p>
                                </div>
                                <div>
                                  <Label className="text-[10px] text-gray-500 mb-0.5 block">Description</Label>
                                  <Input className="h-7 text-[11px]" />
                                </div>
                                <div>
                                  <Label className="text-[10px] text-gray-500 mb-0.5 block">Intent Of Use</Label>
                                  <Input className="h-7 text-[11px]" />
                                </div>
                                <div className="flex items-center gap-1.5">
                                  <Checkbox id="frozen" defaultChecked className="h-3 w-3" />
                                  <Label htmlFor="frozen" className="text-[10px] text-gray-700 cursor-pointer">Frozen</Label>
                                </div>
                                <div className="flex items-center gap-1.5">
                                  <Checkbox id="full-freeze" className="h-3 w-3" />
                                  <Label htmlFor="full-freeze" className="text-[10px] text-gray-700 cursor-pointer">Full Freeze</Label>
                                </div>
                                <div className="flex items-center gap-1.5">
                                  <Checkbox id="group-account" className="h-3 w-3" />
                                  <Label htmlFor="group-account" className="text-[10px] text-gray-700 cursor-pointer">Group Account</Label>
                                </div>
                                <div>
                                  <Label className="text-[10px] text-gray-500 mb-0.5 block">Group Account ID</Label>
                                  <Select>
                                    <SelectTrigger className="h-7 text-[11px]">
                                      <SelectValue placeholder="Select" />
                                    </SelectTrigger>
                                    <SelectContent>
                                      <SelectItem value="none">None</SelectItem>
                                    </SelectContent>
                                  </Select>
                                </div>
                                <div className="flex items-center gap-1.5">
                                  <Checkbox id="leveraged" className="h-3 w-3" />
                                  <Label htmlFor="leveraged" className="text-[10px] text-gray-700 cursor-pointer">Leveraged</Label>
                                </div>
                                <div>
                                  <Label className="text-[10px] text-gray-500 mb-0.5 block">Loan Number</Label>
                                  <Input className="h-7 text-[11px]" />
                                </div>
                                <div className="flex items-center gap-1.5">
                                  <Checkbox id="locked-in" className="h-3 w-3" />
                                  <Label htmlFor="locked-in" className="text-[10px] text-gray-700 cursor-pointer">Locked In</Label>
                                </div>
                                <div>
                                  <Label className="text-[10px] text-gray-500 mb-0.5 block">Recipient</Label>
                                  <Select defaultValue="individual">
                                    <SelectTrigger className="h-7 text-[11px]">
                                      <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                      <SelectItem value="individual">Individual</SelectItem>
                                      <SelectItem value="spouse">Spouse</SelectItem>
                                    </SelectContent>
                                  </Select>
                                </div>
                                <div>
                                  <Label className="text-[10px] text-gray-500 mb-0.5 block">Intermediary Code</Label>
                                  <Input className="h-7 text-[11px]" />
                                </div>
                                <div>
                                  <Label className="text-[10px] text-gray-500 mb-0.5 block">Intermediary Account Code</Label>
                                  <Input className="h-7 text-[11px]" defaultValue="5662474830" readOnly />
                                </div>
                              </div>
                            </div>

                            {/* Plan Custom Questions */}
                            <div className="bg-white p-3 rounded border border-gray-200">
                              <h3 className="text-xs font-semibold text-gray-900 mb-2 pb-1 border-b-2 border-blue-600">Plan Custom Questions</h3>
                              <div className="space-y-2">
                                <div>
                                  <Label className="text-[10px] text-gray-500 mb-0.5 block">test</Label>
                                </div>
                              </div>
                            </div>

                            {/* Ensemble Portfolio Details */}
                            <div className="bg-white p-3 rounded border border-gray-200">
                              <h3 className="text-xs font-semibold text-gray-900 mb-2 pb-1 border-b-2 border-blue-600">Ensemble Portfolio Details</h3>
                              <div className="space-y-1.5">
                                <p className="text-[11px] text-gray-700">This plan is not connected to Ensemble Portfolio</p>
                                <Button variant="outline" size="sm" disabled className="text-[10px] h-6">
                                  Migrate to Ensemble
                                  <HelpCircle className="h-2.5 w-2.5 ml-1" />
                                </Button>
                                <p className="text-[10px] text-gray-500">User does not have access to Ensemble</p>
                              </div>
                            </div>
                          </div>

                          {/* Right Column */}
                          <div className="space-y-3">
                            {/* Important Dates */}
                            <div className="bg-white p-3 rounded border border-gray-200">
                              <h3 className="text-xs font-semibold text-gray-900 mb-2 pb-1 border-b-2 border-blue-600">Important Dates</h3>
                              <div className="grid grid-cols-2 gap-2">
                                <div>
                                  <Label className="text-[10px] text-gray-500 mb-0.5 block">Start Date</Label>
                                  <div className="flex items-center gap-1.5">
                                    <Input className="h-7 text-[11px]" defaultValue="05/21/2008" />
                                    <Calendar className="h-3 w-3 text-gray-500" />
                                  </div>
                                </div>
                                <div>
                                  <Label className="text-[10px] text-gray-500 mb-0.5 block">End Date</Label>
                                  <div className="flex items-center gap-1.5">
                                    <Input className="h-7 text-[11px]" />
                                    <Calendar className="h-3 w-3 text-gray-500" />
                                  </div>
                                </div>
                                <div>
                                  <Label className="text-[10px] text-gray-500 mb-0.5 block">KYC On File Date</Label>
                                  <div className="flex items-center gap-1.5">
                                    <Input className="h-7 text-[11px]" defaultValue="03/13/2007" />
                                    <Calendar className="h-3 w-3 text-gray-500" />
                                  </div>
                                </div>
                                <div>
                                  <Label className="text-[10px] text-gray-500 mb-0.5 block">KYC Age</Label>
                                  <Input className="h-7 text-[11px]" defaultValue="6852 days Old" readOnly />
                                </div>
                                <div>
                                  <Label className="text-[10px] text-gray-500 mb-0.5 block">KYC Original Received Date</Label>
                                  <div className="flex items-center gap-1.5">
                                    <Input className="h-7 text-[11px]" />
                                    <Calendar className="h-3 w-3 text-gray-500" />
                                  </div>
                                </div>
                              </div>
                            </div>

                            {/* Revenue Model */}
                            <div className="bg-white p-3 rounded border border-gray-200">
                              <h3 className="text-xs font-semibold text-gray-900 mb-2 pb-1 border-b-2 border-blue-600">Revenue Model</h3>
                              <div className="grid grid-cols-2 gap-2">
                                <div>
                                  <Label className="text-[10px] text-gray-500 mb-0.5 block">Revenue Model</Label>
                                  <Select defaultValue="commissions">
                                    <SelectTrigger className="h-7 text-[11px]">
                                      <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                      <SelectItem value="commissions">Commissions</SelectItem>
                                      <SelectItem value="fee-for-service">Fee for Service</SelectItem>
                                    </SelectContent>
                                  </Select>
                                </div>
                                <div>
                                  <Label className="text-[10px] text-gray-500 mb-0.5 block">Fee for Service Amount</Label>
                                  <Input className="h-7 text-[11px]" />
                                </div>
                                <div>
                                  <Label className="text-[10px] text-gray-500 mb-0.5 block">Fee for Service Start Date</Label>
                                  <div className="flex items-center gap-1.5">
                                    <Input className="h-7 text-[11px]" />
                                    <Calendar className="h-3 w-3 text-gray-500" />
                                  </div>
                                </div>
                                <div className="flex items-center gap-1.5 pt-4">
                                  <Checkbox id="ffs-approved" className="h-3 w-3" />
                                  <Label htmlFor="ffs-approved" className="text-[10px] text-gray-700 cursor-pointer">Fee for Service Approved</Label>
                                </div>
                              </div>
                            </div>

                            {/* Plan Fee Settings */}
                            <div className="bg-white p-3 rounded border border-gray-200">
                              <h3 className="text-xs font-semibold text-gray-900 mb-2 pb-1 border-b-2 border-blue-600">Plan Fee Settings</h3>
                              <Table>
                                <TableHeader>
                                  <TableRow className="bg-gray-50">
                                    <TableHead className="text-[10px] font-semibold text-gray-700 py-1 px-2">Schedule Name</TableHead>
                                    <TableHead className="text-[10px] font-semibold text-gray-700 py-1 px-2">Setting Option</TableHead>
                                    <TableHead className="text-[10px] font-semibold text-gray-700 py-1 px-2">Start Date</TableHead>
                                    <TableHead className="text-[10px] font-semibold text-gray-700 py-1 px-2">Bank Account</TableHead>
                                    <TableHead className="text-[10px] font-semibold text-gray-700 py-1 px-2">Override Fund</TableHead>
                                  </TableRow>
                                </TableHeader>
                                <TableBody>
                                  <TableRow>
                                    <TableCell colSpan={5} className="text-center py-2">
                                      <p className="text-[10px] text-gray-500 italic">No records found.</p>
                                    </TableCell>
                                  </TableRow>
                                </TableBody>
                              </Table>
                            </div>

                            {/* Plan FFS Override Fund */}
                            <div className="bg-white p-3 rounded border border-gray-200">
                              <h3 className="text-xs font-semibold text-gray-900 mb-2 pb-1 border-b-2 border-blue-600">Plan FFS Override Fund</h3>
                              <div>
                                <Label className="text-[10px] text-gray-500 mb-0.5 block">Plan FFS Override Fund</Label>
                                <Select defaultValue="none">
                                  <SelectTrigger className="h-7 text-[11px]">
                                    <SelectValue />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="none">None</SelectItem>
                                  </SelectContent>
                                </Select>
                              </div>
                            </div>

                            {/* Additional Financial Interest */}
                            <div className="bg-white p-3 rounded border border-gray-200">
                              <h3 className="text-xs font-semibold text-gray-900 mb-2 pb-1 border-b-2 border-blue-600">Additional Financial Interest</h3>
                              <div className="grid grid-cols-2 gap-2">
                                <div>
                                  <Label className="text-[10px] text-gray-500 mb-0.5 block">Does anyone else have trading authorization?</Label>
                                  <Select defaultValue="no">
                                    <SelectTrigger className="h-7 text-[11px]">
                                      <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                      <SelectItem value="yes">Yes</SelectItem>
                                      <SelectItem value="no">No</SelectItem>
                                    </SelectContent>
                                  </Select>
                                </div>
                                <div>
                                  <Label className="text-[10px] text-gray-500 mb-0.5 block">Name</Label>
                                  <Input className="h-7 text-[11px]" />
                                </div>
                                <div>
                                  <Label className="text-[10px] text-gray-500 mb-0.5 block">Does anyone else have a Financial Interest?</Label>
                                  <Select defaultValue="no">
                                    <SelectTrigger className="h-7 text-[11px]">
                                      <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                      <SelectItem value="yes">Yes</SelectItem>
                                      <SelectItem value="no">No</SelectItem>
                                    </SelectContent>
                                  </Select>
                                </div>
                                <div>
                                  <Label className="text-[10px] text-gray-500 mb-0.5 block">Name</Label>
                                  <Input className="h-7 text-[11px]" />
                                </div>
                              </div>
                            </div>

                            {/* Average Value */}
                            <div className="bg-white p-3 rounded border border-gray-200">
                              <h3 className="text-xs font-semibold text-gray-900 mb-2 pb-1 border-b-2 border-blue-600">Average Value</h3>
                              <div className="grid grid-cols-2 gap-2">
                                <div className="flex items-center gap-1.5">
                                  <Checkbox id="by-month" defaultChecked className="h-3 w-3" />
                                  <Label htmlFor="by-month" className="text-[10px] text-gray-700 cursor-pointer">By Month</Label>
                                </div>
                                <div>
                                  <Label className="text-[10px] text-gray-500 mb-0.5 block">Month</Label>
                                  <Select defaultValue="december">
                                    <SelectTrigger className="h-7 text-[11px]">
                                      <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                      <SelectItem value="january">January</SelectItem>
                                      <SelectItem value="february">February</SelectItem>
                                      <SelectItem value="march">March</SelectItem>
                                      <SelectItem value="april">April</SelectItem>
                                      <SelectItem value="may">May</SelectItem>
                                      <SelectItem value="june">June</SelectItem>
                                      <SelectItem value="july">July</SelectItem>
                                      <SelectItem value="august">August</SelectItem>
                                      <SelectItem value="september">September</SelectItem>
                                      <SelectItem value="october">October</SelectItem>
                                      <SelectItem value="november">November</SelectItem>
                                      <SelectItem value="december">December</SelectItem>
                                    </SelectContent>
                                  </Select>
                                </div>
                                <div>
                                  <Label className="text-[10px] text-gray-500 mb-0.5 block">Year</Label>
                                  <Select defaultValue="2025">
                                    <SelectTrigger className="h-7 text-[11px]">
                                      <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                      <SelectItem value="2025">2025</SelectItem>
                                      <SelectItem value="2024">2024</SelectItem>
                                      <SelectItem value="2023">2023</SelectItem>
                                    </SelectContent>
                                  </Select>
                                </div>
                                <div>
                                  <Label className="text-[10px] text-gray-500 mb-0.5 block">Start Date</Label>
                                  <div className="flex items-center gap-1.5">
                                    <Input className="h-7 text-[11px]" />
                                    <Calendar className="h-3 w-3 text-gray-500" />
                                  </div>
                                </div>
                                <div>
                                  <Label className="text-[10px] text-gray-500 mb-0.5 block">End Date</Label>
                                  <div className="flex items-center gap-1.5">
                                    <Input className="h-7 text-[11px]" />
                                    <Calendar className="h-3 w-3 text-gray-500" />
                                  </div>
                                </div>
                                <div className="flex items-center gap-1.5 pt-4">
                                  <Checkbox id="ffs-only" className="h-3 w-3" />
                                  <Label htmlFor="ffs-only" className="text-[10px] text-gray-700 cursor-pointer">Fee For Service Only</Label>
                                </div>
                                <div className="pt-4">
                                  <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-white text-[10px] h-6">
                                    Calculate
                                  </Button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </TabsContent>

                      <TabsContent value="notes" className="mt-4">
                        <div className="space-y-4">
                          {/* Plan Notes Section */}
                          <div className="bg-white p-4 rounded border border-gray-200">
                            <h3 className="text-sm font-semibold text-gray-900 mb-4">Plan Notes</h3>
                            <div className="space-y-4">
                              {/* New Plan Note Button */}
                              <Button className="bg-green-600 hover:bg-green-700 text-white text-xs h-8">
                                New Plan Note
                              </Button>
                              
                              {/* Notes Display Area */}
                              <div className="bg-blue-50 border border-blue-200 rounded p-6 min-h-[400px]">
                                {/* Empty state - notes would be displayed here */}
                              </div>
                            </div>
                          </div>
                        </div>
                      </TabsContent>

                      <TabsContent value="plan-attachments" className="mt-4">
                        <div className="space-y-6">
                          {/* Pinned Documents */}
                          <div className="bg-white p-4 rounded border border-gray-200">
                            <h3 className="text-sm font-semibold text-gray-900 mb-4 pb-2 border-b border-gray-300">Pinned Documents</h3>
                            <Table>
                              <TableHeader>
                                <TableRow className="bg-gray-50">
                                  <TableHead className="text-xs font-semibold text-gray-700 py-2 px-3">Document Type</TableHead>
                                  <TableHead className="text-xs font-semibold text-gray-700 py-2 px-3">On File</TableHead>
                                  <TableHead className="text-xs font-semibold text-gray-700 py-2 px-3">On File Date</TableHead>
                                </TableRow>
                              </TableHeader>
                              <TableBody>
                                <TableRow>
                                  <TableCell className="text-xs py-2 px-3">Auto Conversion of Units</TableCell>
                                  <TableCell className="text-xs py-2 px-3">No</TableCell>
                                  <TableCell className="text-xs py-2 px-3"></TableCell>
                                </TableRow>
                                <TableRow className="bg-gray-50">
                                  <TableCell className="text-xs py-2 px-3">Auto Conversion of Units (Express Service / Self Serve)</TableCell>
                                  <TableCell className="text-xs py-2 px-3">No</TableCell>
                                  <TableCell className="text-xs py-2 px-3"></TableCell>
                                </TableRow>
                                <TableRow>
                                  <TableCell className="text-xs py-2 px-3">Disclosure Document - Loan</TableCell>
                                  <TableCell className="text-xs py-2 px-3">No</TableCell>
                                  <TableCell className="text-xs py-2 px-3"></TableCell>
                                </TableRow>
                                <TableRow className="bg-gray-50">
                                  <TableCell className="text-xs py-2 px-3">Fee for Service Agreement</TableCell>
                                  <TableCell className="text-xs py-2 px-3">No</TableCell>
                                  <TableCell className="text-xs py-2 px-3"></TableCell>
                                </TableRow>
                                <TableRow>
                                  <TableCell className="text-xs py-2 px-3">Joint LAF</TableCell>
                                  <TableCell className="text-xs py-2 px-3">No</TableCell>
                                  <TableCell className="text-xs py-2 px-3"></TableCell>
                                </TableRow>
                                <TableRow className="bg-gray-50">
                                  <TableCell className="text-xs py-2 px-3">LAF</TableCell>
                                  <TableCell className="text-xs py-2 px-3">No</TableCell>
                                  <TableCell className="text-xs py-2 px-3"></TableCell>
                                </TableRow>
                                <TableRow>
                                  <TableCell className="text-xs py-2 px-3">Other for Processing (Express Service / Self Serve)</TableCell>
                                  <TableCell className="text-xs py-2 px-3">No</TableCell>
                                  <TableCell className="text-xs py-2 px-3"></TableCell>
                                </TableRow>
                                <TableRow className="bg-gray-50">
                                  <TableCell className="text-xs py-2 px-3">PAC/SWP form (Express Service / Self Serve)</TableCell>
                                  <TableCell className="text-xs py-2 px-3">No</TableCell>
                                  <TableCell className="text-xs py-2 px-3"></TableCell>
                                </TableRow>
                                <TableRow>
                                  <TableCell className="text-xs py-2 px-3">Power of Attorney</TableCell>
                                  <TableCell className="text-xs py-2 px-3">No</TableCell>
                                  <TableCell className="text-xs py-2 px-3"></TableCell>
                                </TableRow>
                                <TableRow className="bg-gray-50">
                                  <TableCell className="text-xs py-2 px-3">Trading Authorization</TableCell>
                                  <TableCell className="text-xs py-2 px-3">No</TableCell>
                                  <TableCell className="text-xs py-2 px-3"></TableCell>
                                </TableRow>
                                <TableRow>
                                  <TableCell className="text-xs py-2 px-3">Transfer Documents</TableCell>
                                  <TableCell className="text-xs py-2 px-3">No</TableCell>
                                  <TableCell className="text-xs py-2 px-3"></TableCell>
                                </TableRow>
                                <TableRow className="bg-gray-50">
                                  <TableCell className="text-xs py-2 px-3">Void Cheque</TableCell>
                                  <TableCell className="text-xs py-2 px-3">No</TableCell>
                                  <TableCell className="text-xs py-2 px-3"></TableCell>
                                </TableRow>
                              </TableBody>
                            </Table>
                          </div>

                          {/* Plan Attachments */}
                          <div className="bg-white p-4 rounded border border-gray-200">
                            <h3 className="text-sm font-semibold text-gray-900 mb-4 pb-2 border-b border-gray-300">Plan Attachments</h3>
                            <div className="space-y-4">
                              {/* Action Buttons */}
                              <div className="flex items-center gap-3">
                                <Button className="bg-green-600 hover:bg-green-700 text-white text-xs h-8">
                                  Add New Attachment
                                </Button>
                                <Button variant="outline" className="bg-blue-600 hover:bg-blue-700 text-white border-blue-600 text-xs h-8">
                                  Link Existing Attachment
                                </Button>
                                <Button variant="outline" className="bg-blue-600 hover:bg-blue-700 text-white border-blue-600 text-xs h-8">
                                  Unlink Attachment
                                </Button>
                              </div>
                              {/* Checkboxes */}
                              <div className="flex items-center gap-6">
                                <div className="flex items-center gap-2">
                                  <Checkbox id="include-inactive-attachments" />
                                  <Label htmlFor="include-inactive-attachments" className="text-xs text-gray-700 cursor-pointer">Include Inactive</Label>
                                </div>
                                <div className="flex items-center gap-2">
                                  <Checkbox id="include-funds-attachments" />
                                  <Label htmlFor="include-funds-attachments" className="text-xs text-gray-700 cursor-pointer">Include attachments from Funds, GICs, Transactions, and Trust Transactions</Label>
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* Attachments */}
                          <div className="bg-white p-4 rounded border border-gray-200">
                            <h3 className="text-sm font-semibold text-gray-900 mb-4 pb-2 border-b border-gray-300">Attachments</h3>
                            <div className="py-8">
                              <p className="text-xs text-gray-500 text-center">No attachments found.</p>
                            </div>
                          </div>
                        </div>
                      </TabsContent>

                      <TabsContent value="allocations" className="mt-4">
                        <div className="space-y-4">
                          {/* Allocations Sub-tabs */}
                          <Tabs value={allocationsView} onValueChange={(value) => setAllocationsView(value as "chart" | "table")}>
                            <TabsList className="grid w-full grid-cols-2 h-8 mb-4">
                              <TabsTrigger value="chart" className="text-xs">Allocations (Chart)</TabsTrigger>
                              <TabsTrigger value="table" className="text-xs">Allocations (Table)</TabsTrigger>
                            </TabsList>

                            <TabsContent value="chart" className="mt-4">
                              <div className="grid grid-cols-3 gap-4">
                                {/* Geographic Allocation */}
                                <div className="bg-white p-4 rounded border border-gray-200">
                                  <h4 className="text-sm font-semibold text-gray-900 mb-4 text-center">Geographic Allocation</h4>
                                  <ResponsiveContainer width="100%" height={300}>
                                    <PieChart>
                                      <Pie
                                        data={[
                                          { name: "Canada", value: 48.01 },
                                          { name: "Multi-National", value: 12.57 },
                                          { name: "European Union", value: 6.18 },
                                          { name: "United States", value: 20.16 },
                                          { name: "Asia/Pacific Rim", value: 4.02 },
                                          { name: "Japan", value: 4.42 },
                                          { name: "Latin America", value: 1.58 },
                                          { name: "All Others", value: 3.06 },
                                        ]}
                                        cx="50%"
                                        cy="50%"
                                        outerRadius={100}
                                        fill="#8884d8"
                                        dataKey="value"
                                      >
                                        <Cell fill="#22c55e" />
                                        <Cell fill="#eab308" />
                                        <Cell fill="#3b82f6" />
                                        <Cell fill="#ef4444" />
                                        <Cell fill="#f97316" />
                                        <Cell fill="#dc2626" />
                                        <Cell fill="#1e40af" />
                                        <Cell fill="#9333ea" />
                                      </Pie>
                                      <RechartsTooltip formatter={(value: number) => `${value.toFixed(2)}%`} />
                                      <Legend />
                                    </PieChart>
                                  </ResponsiveContainer>
                                </div>

                                {/* Asset Allocation */}
                                <div className="bg-white p-4 rounded border border-gray-200">
                                  <h4 className="text-sm font-semibold text-gray-900 mb-4 text-center">Asset Allocation</h4>
                                  <ResponsiveContainer width="100%" height={300}>
                                    <PieChart>
                                      <Pie
                                        data={[
                                          { name: "International Equity", value: 25.10 },
                                          { name: "Cash and Equivalents", value: 6.92 },
                                          { name: "Foreign Bonds", value: 8.03 },
                                          { name: "Canadian Equity", value: 17.96 },
                                          { name: "Domestic Bonds", value: 23.33 },
                                          { name: "US Equity", value: 12.86 },
                                          { name: "Mutual Fund", value: 9.54 },
                                          { name: "Other", value: 5.18 },
                                          { name: "All Others", value: 0.62 },
                                        ]}
                                        cx="50%"
                                        cy="50%"
                                        outerRadius={100}
                                        fill="#8884d8"
                                        dataKey="value"
                                      >
                                        <Cell fill="#9333ea" />
                                        <Cell fill="#6b7280" />
                                        <Cell fill="#ec4899" />
                                        <Cell fill="#eab308" />
                                        <Cell fill="#22c55e" />
                                        <Cell fill="#3b82f6" />
                                        <Cell fill="#84cc16" />
                                        <Cell fill="#ef4444" />
                                        <Cell fill="#f87171" />
                                      </Pie>
                                      <RechartsTooltip formatter={(value: number) => `${value.toFixed(2)}%`} />
                                      <Legend />
                                    </PieChart>
                                  </ResponsiveContainer>
                                </div>

                                {/* Sector Allocation */}
                                <div className="bg-white p-4 rounded border border-gray-200">
                                  <h4 className="text-sm font-semibold text-gray-900 mb-4 text-center">Sector Allocation</h4>
                                  <ResponsiveContainer width="100%" height={300}>
                                    <PieChart>
                                      <Pie
                                        data={[
                                          { name: "Fixed Income", value: 31.26 },
                                          { name: "All Others", value: 23.47 },
                                          { name: "Financial Services", value: 11.87 },
                                          { name: "Technology", value: 7.86 },
                                          { name: "Mutual Fund", value: 9.54 },
                                          { name: "Energy", value: 4.62 },
                                          { name: "Cash and Cash Equivalent", value: 6.94 },
                                          { name: "Consumer Services", value: 4.44 },
                                        ]}
                                        cx="50%"
                                        cy="50%"
                                        outerRadius={100}
                                        fill="#8884d8"
                                        dataKey="value"
                                      >
                                        <Cell fill="#ec4899" />
                                        <Cell fill="#eab308" />
                                        <Cell fill="#3b82f6" />
                                        <Cell fill="#6b7280" />
                                        <Cell fill="#ef4444" />
                                        <Cell fill="#22c55e" />
                                        <Cell fill="#84cc16" />
                                        <Cell fill="#f97316" />
                                      </Pie>
                                      <RechartsTooltip formatter={(value: number) => `${value.toFixed(2)}%`} />
                                      <Legend />
                                    </PieChart>
                                  </ResponsiveContainer>
                                </div>
                              </div>
                            </TabsContent>

                            <TabsContent value="table" className="mt-4">
                              <div className="grid grid-cols-3 gap-4">
                                {/* Geographic Allocation Table */}
                                <div className="bg-white p-4 rounded border border-gray-200">
                                  <h4 className="text-sm font-semibold text-gray-900 mb-4 text-center">Geographic Allocation</h4>
                                  <Table>
                                    <TableBody>
                                      <TableRow>
                                        <TableCell className="text-xs py-2 px-3">Canada</TableCell>
                                        <TableCell className="text-xs py-2 px-3 text-right font-medium">48.01%</TableCell>
                                      </TableRow>
                                      <TableRow className="bg-gray-50">
                                        <TableCell className="text-xs py-2 px-3">Multi-National</TableCell>
                                        <TableCell className="text-xs py-2 px-3 text-right font-medium">12.57%</TableCell>
                                      </TableRow>
                                      <TableRow>
                                        <TableCell className="text-xs py-2 px-3">European Union</TableCell>
                                        <TableCell className="text-xs py-2 px-3 text-right font-medium">6.18%</TableCell>
                                      </TableRow>
                                      <TableRow className="bg-gray-50">
                                        <TableCell className="text-xs py-2 px-3">United States</TableCell>
                                        <TableCell className="text-xs py-2 px-3 text-right font-medium">20.16%</TableCell>
                                      </TableRow>
                                      <TableRow>
                                        <TableCell className="text-xs py-2 px-3">Japan</TableCell>
                                        <TableCell className="text-xs py-2 px-3 text-right font-medium">4.42%</TableCell>
                                      </TableRow>
                                      <TableRow className="bg-gray-50">
                                        <TableCell className="text-xs py-2 px-3">Asia/Pacific Rim</TableCell>
                                        <TableCell className="text-xs py-2 px-3 text-right font-medium">4.02%</TableCell>
                                      </TableRow>
                                      <TableRow>
                                        <TableCell className="text-xs py-2 px-3">Latin America</TableCell>
                                        <TableCell className="text-xs py-2 px-3 text-right font-medium">1.58%</TableCell>
                                      </TableRow>
                                      <TableRow className="bg-gray-50">
                                        <TableCell className="text-xs py-2 px-3">All Others</TableCell>
                                        <TableCell className="text-xs py-2 px-3 text-right font-medium">3.06%</TableCell>
                                      </TableRow>
                                    </TableBody>
                                  </Table>
                                </div>

                                {/* Asset Allocation Table */}
                                <div className="bg-white p-4 rounded border border-gray-200">
                                  <h4 className="text-sm font-semibold text-gray-900 mb-4 text-center">Asset Allocation</h4>
                                  <Table>
                                    <TableBody>
                                      <TableRow>
                                        <TableCell className="text-xs py-2 px-3">Foreign Bonds</TableCell>
                                        <TableCell className="text-xs py-2 px-3 text-right font-medium">8.03%</TableCell>
                                      </TableRow>
                                      <TableRow className="bg-gray-50">
                                        <TableCell className="text-xs py-2 px-3">International Equity</TableCell>
                                        <TableCell className="text-xs py-2 px-3 text-right font-medium">25.10%</TableCell>
                                      </TableRow>
                                      <TableRow>
                                        <TableCell className="text-xs py-2 px-3">Domestic Bonds</TableCell>
                                        <TableCell className="text-xs py-2 px-3 text-right font-medium">23.33%</TableCell>
                                      </TableRow>
                                      <TableRow className="bg-gray-50">
                                        <TableCell className="text-xs py-2 px-3">US Equity</TableCell>
                                        <TableCell className="text-xs py-2 px-3 text-right font-medium">12.86%</TableCell>
                                      </TableRow>
                                      <TableRow>
                                        <TableCell className="text-xs py-2 px-3">Cash and Equivalents</TableCell>
                                        <TableCell className="text-xs py-2 px-3 text-right font-medium">6.92%</TableCell>
                                      </TableRow>
                                      <TableRow className="bg-gray-50">
                                        <TableCell className="text-xs py-2 px-3">Canadian Equity</TableCell>
                                        <TableCell className="text-xs py-2 px-3 text-right font-medium">17.96%</TableCell>
                                      </TableRow>
                                      <TableRow>
                                        <TableCell className="text-xs py-2 px-3">All Others</TableCell>
                                        <TableCell className="text-xs py-2 px-3 text-right font-medium">0.62%</TableCell>
                                      </TableRow>
                                      <TableRow className="bg-gray-50">
                                        <TableCell className="text-xs py-2 px-3">Other</TableCell>
                                        <TableCell className="text-xs py-2 px-3 text-right font-medium">5.18%</TableCell>
                                      </TableRow>
                                    </TableBody>
                                  </Table>
                                </div>

                                {/* Sector Allocation Table */}
                                <div className="bg-white p-4 rounded border border-gray-200">
                                  <h4 className="text-sm font-semibold text-gray-900 mb-4 text-center">Sector Allocation</h4>
                                  <Table>
                                    <TableBody>
                                      <TableRow>
                                        <TableCell className="text-xs py-2 px-3">Financial Services</TableCell>
                                        <TableCell className="text-xs py-2 px-3 text-right font-medium">11.87%</TableCell>
                                      </TableRow>
                                      <TableRow className="bg-gray-50">
                                        <TableCell className="text-xs py-2 px-3">Mutual Fund</TableCell>
                                        <TableCell className="text-xs py-2 px-3 text-right font-medium">9.54%</TableCell>
                                      </TableRow>
                                      <TableRow>
                                        <TableCell className="text-xs py-2 px-3">Energy</TableCell>
                                        <TableCell className="text-xs py-2 px-3 text-right font-medium">4.62%</TableCell>
                                      </TableRow>
                                      <TableRow className="bg-gray-50">
                                        <TableCell className="text-xs py-2 px-3">Technology</TableCell>
                                        <TableCell className="text-xs py-2 px-3 text-right font-medium">7.86%</TableCell>
                                      </TableRow>
                                      <TableRow>
                                        <TableCell className="text-xs py-2 px-3">Consumer Services</TableCell>
                                        <TableCell className="text-xs py-2 px-3 text-right font-medium">4.44%</TableCell>
                                      </TableRow>
                                      <TableRow className="bg-gray-50">
                                        <TableCell className="text-xs py-2 px-3">Cash and Cash Equivalent</TableCell>
                                        <TableCell className="text-xs py-2 px-3 text-right font-medium">6.94%</TableCell>
                                      </TableRow>
                                      <TableRow>
                                        <TableCell className="text-xs py-2 px-3">Fixed Income</TableCell>
                                        <TableCell className="text-xs py-2 px-3 text-right font-medium">31.26%</TableCell>
                                      </TableRow>
                                      <TableRow className="bg-gray-50">
                                        <TableCell className="text-xs py-2 px-3">All Others</TableCell>
                                        <TableCell className="text-xs py-2 px-3 text-right font-medium">23.47%</TableCell>
                                      </TableRow>
                                    </TableBody>
                                  </Table>
                                </div>
                              </div>
                            </TabsContent>
                          </Tabs>
                        </div>
                      </TabsContent>

                      <TabsContent value="supplier-accounts" className="mt-4">
                        <div className="space-y-4">
                          {/* Include Inactive Checkbox */}
                          <div className="flex items-center gap-2">
                            <Checkbox id="include-inactive-supplier-accounts" />
                            <Label htmlFor="include-inactive-supplier-accounts" className="text-xs text-gray-700 cursor-pointer">Include Inactive</Label>
                          </div>

                          {/* Supplier Accounts Table */}
                          <div className="bg-white rounded border border-gray-200">
                            <Table>
                              <TableHeader>
                                <TableRow className="bg-gray-50">
                                  <TableHead className="text-xs font-semibold text-gray-700 py-2 px-3">
                                    <div className="flex items-center gap-1">
                                      Supplier
                                      <ChevronUp className="h-3 w-3 text-gray-500" />
                                    </div>
                                  </TableHead>
                                  <TableHead className="text-xs font-semibold text-gray-700 py-2 px-3">
                                    <div className="flex items-center gap-1">
                                      Account Number
                                      <ChevronUp className="h-3 w-3 text-gray-500" />
                                    </div>
                                  </TableHead>
                                  <TableHead className="text-xs font-semibold text-gray-700 py-2 px-3">
                                    <div className="flex items-center gap-1">
                                      Start Date
                                      <ChevronUp className="h-3 w-3 text-gray-500" />
                                    </div>
                                  </TableHead>
                                  <TableHead className="text-xs font-semibold text-gray-700 py-2 px-3">
                                    <div className="flex items-center gap-1">
                                      End Date
                                      <ChevronUp className="h-3 w-3 text-gray-500" />
                                    </div>
                                  </TableHead>
                                  <TableHead className="text-xs font-semibold text-gray-700 py-2 px-3">
                                    <div className="flex items-center gap-1">
                                      Market Value
                                      <ChevronUp className="h-3 w-3 text-gray-500" />
                                    </div>
                                  </TableHead>
                                </TableRow>
                              </TableHeader>
                              <TableBody>
                                <TableRow>
                                  <TableCell className="text-xs py-2 px-3">CIG</TableCell>
                                  <TableCell className="text-xs py-2 px-3">59108738</TableCell>
                                  <TableCell className="text-xs py-2 px-3">07/08/2005</TableCell>
                                  <TableCell className="text-xs py-2 px-3">-</TableCell>
                                  <TableCell className="text-xs py-2 px-3">$0.00</TableCell>
                                </TableRow>
                              </TableBody>
                            </Table>
                          </div>
                        </div>
                      </TabsContent>

                      <TabsContent value="custom-compensation" className="mt-4">
                        <div className="space-y-4">
                          {/* Custom Compensation Table */}
                          <div className="bg-white rounded border border-gray-200">
                            <Table>
                              <TableHeader>
                                <TableRow className="bg-gray-50">
                                  <TableHead className="text-xs font-semibold text-gray-700 py-2 px-3">
                                    <div className="flex items-center gap-1">
                                      Date
                                      <ChevronUp className="h-3 w-3 text-gray-500" />
                                    </div>
                                  </TableHead>
                                  <TableHead className="text-xs font-semibold text-gray-700 py-2 px-3">
                                    <div className="flex items-center gap-1">
                                      Type
                                      <ChevronUp className="h-3 w-3 text-gray-500" />
                                    </div>
                                  </TableHead>
                                  <TableHead className="text-xs font-semibold text-gray-700 py-2 px-3">
                                    <div className="flex items-center gap-1">
                                      Amount
                                      <ChevronUp className="h-3 w-3 text-gray-500" />
                                    </div>
                                  </TableHead>
                                </TableRow>
                              </TableHeader>
                              <TableBody>
                                <TableRow>
                                  <TableCell colSpan={3} className="text-center py-8">
                                    <div className="flex flex-col items-center gap-3">
                                      <p className="text-xs text-gray-500">No custom compensation records found</p>
                                      <Button variant="outline" size="sm" className="bg-blue-600 hover:bg-blue-700 text-white border-blue-600 text-xs h-8">
                                        <RefreshCw className="h-3 w-3 mr-2" />
                                        Refresh
                                      </Button>
                                    </div>
                                  </TableCell>
                                </TableRow>
                              </TableBody>
                            </Table>
                          </div>
                        </div>
                      </TabsContent>
                    </Tabs>
                  </TabsContent>

                  <TabsContent value="kyc" className="mt-4">
                    <div className="space-y-6">
                      {/* KYC Information Section */}
                      <div className="bg-white p-4 rounded border border-gray-200">
                        <h3 className="text-sm font-semibold text-gray-900 mb-4 pb-2 border-b-2 border-blue-600">KYC Information</h3>
                        <div className="space-y-4">
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <Label className="text-xs text-gray-500 mb-1 block">KYC On File Date</Label>
                              <Input className="h-8 text-sm" defaultValue="03/13/2007" readOnly />
                            </div>
                            <div>
                              <Label className="text-xs text-gray-500 mb-1 block">KYC Age</Label>
                              <Input className="h-8 text-sm text-red-600" defaultValue="6852 days old" readOnly />
                            </div>
                          </div>

                          {/* Risk and Investment Objective Tables */}
                          <div className="grid grid-cols-2 gap-4">
                            {/* Risk Table */}
                            <div>
                              <Label className="text-xs font-semibold text-gray-700 mb-2 block">Risk</Label>
                              <Table>
                                <TableBody>
                                  <TableRow>
                                    <TableCell className="text-xs py-1 px-3">Low</TableCell>
                                    <TableCell className="text-xs py-1 px-3 text-right">0 %</TableCell>
                                  </TableRow>
                                  <TableRow className="bg-gray-50">
                                    <TableCell className="text-xs py-1 px-3">Low Medium</TableCell>
                                    <TableCell className="text-xs py-1 px-3 text-right">0 %</TableCell>
                                  </TableRow>
                                  <TableRow>
                                    <TableCell className="text-xs py-1 px-3">Medium</TableCell>
                                    <TableCell className="text-xs py-1 px-3 text-right font-medium">100 %</TableCell>
                                  </TableRow>
                                  <TableRow className="bg-gray-50">
                                    <TableCell className="text-xs py-1 px-3">Medium High</TableCell>
                                    <TableCell className="text-xs py-1 px-3 text-right">0 %</TableCell>
                                  </TableRow>
                                  <TableRow>
                                    <TableCell className="text-xs py-1 px-3">High</TableCell>
                                    <TableCell className="text-xs py-1 px-3 text-right">0 %</TableCell>
                                  </TableRow>
                                </TableBody>
                              </Table>
                            </div>

                            {/* Investment Objective Table */}
                            <div>
                              <Label className="text-xs font-semibold text-gray-700 mb-2 block">Investment Objective</Label>
                              <Table>
                                <TableBody>
                                  <TableRow>
                                    <TableCell className="text-xs py-1 px-3">Safety</TableCell>
                                    <TableCell className="text-xs py-1 px-3 text-right">0 %</TableCell>
                                  </TableRow>
                                  <TableRow className="bg-gray-50">
                                    <TableCell className="text-xs py-1 px-3">Income</TableCell>
                                    <TableCell className="text-xs py-1 px-3 text-right">0 %</TableCell>
                                  </TableRow>
                                  <TableRow>
                                    <TableCell className="text-xs py-1 px-3">Growth</TableCell>
                                    <TableCell className="text-xs py-1 px-3 text-right font-medium">100 %</TableCell>
                                  </TableRow>
                                  <TableRow className="bg-gray-50">
                                    <TableCell className="text-xs py-1 px-3">Speculation</TableCell>
                                    <TableCell className="text-xs py-1 px-3 text-right">0 %</TableCell>
                                  </TableRow>
                                </TableBody>
                              </Table>
                            </div>
                          </div>

                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <Label className="text-xs text-gray-500 mb-1 block">Time Horizon</Label>
                              <Input className="h-8 text-sm" defaultValue="20+ years" readOnly />
                            </div>
                            <div>
                              <Label className="text-xs text-gray-500 mb-1 block">Objective Type Override</Label>
                              <Input className="h-8 text-sm" defaultValue="Not Set" readOnly />
                            </div>
                          </div>

                          <div className="flex items-center gap-2">
                            <Checkbox id="kyc-exempt-products" />
                            <Label htmlFor="kyc-exempt-products" className="text-xs text-gray-700 cursor-pointer">Plan KYC applies to exempt products</Label>
                          </div>
                        </div>
                      </div>

                      {/* History Section */}
                      <div className="bg-white p-4 rounded border border-gray-200">
                        <h3 className="text-sm font-semibold text-gray-900 mb-4 pb-2 border-b-2 border-blue-600">History</h3>
                        <div className="space-y-4">
                          <Table>
                            <TableHeader>
                              <TableRow className="bg-gray-50">
                                <TableHead className="text-xs font-semibold text-gray-700 py-2 px-3">Date Created</TableHead>
                                <TableHead className="text-xs font-semibold text-gray-700 py-2 px-3">Status</TableHead>
                                <TableHead className="text-xs font-semibold text-gray-700 py-2 px-3">Date Submitted</TableHead>
                                <TableHead className="text-xs font-semibold text-gray-700 py-2 px-3"></TableHead>
                              </TableRow>
                            </TableHeader>
                            <TableBody>
                              <TableRow>
                                <TableCell className="text-xs py-2 px-3">10/16/2025</TableCell>
                                <TableCell className="text-xs py-2 px-3">Draft</TableCell>
                                <TableCell className="text-xs py-2 px-3"></TableCell>
                                <TableCell className="text-xs py-2 px-3">
                                  <Button size="sm" className="bg-green-600 hover:bg-green-700 text-white text-xs h-7">
                                    Edit Draft KYC Update
                                  </Button>
                                </TableCell>
                              </TableRow>
                            </TableBody>
                          </Table>
                          <div className="flex justify-end">
                            <Button variant="ghost" size="sm" className="text-xs h-7">
                              <RefreshCw className="h-3 w-3" />
                            </Button>
                          </div>
                        </div>
                      </div>

                      {/* KYC Graphs Section */}
                      <div className="bg-white p-4 rounded border border-gray-200">
                        <h3 className="text-sm font-semibold text-gray-900 mb-4 pb-2 border-b-2 border-blue-600">KYC Graphs</h3>
                        <div className="grid grid-cols-3 gap-4">
                          {/* Risk Bar Chart */}
                          <div>
                            <h4 className="text-xs font-semibold text-gray-900 mb-1 text-center">Risk</h4>
                            <p className="text-[10px] text-gray-500 mb-2 text-center">Cash Account: $0.00</p>
                            <ResponsiveContainer width="100%" height={200}>
                              <BarChart data={[
                                { category: "L", actual: 0, kyc: 0 },
                                { category: "LM", actual: 0, kyc: 100 },
                                { category: "M", actual: 100, kyc: 100 },
                                { category: "MH", actual: 0, kyc: 0 },
                                { category: "H", actual: 0, kyc: 0 },
                              ]}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="category" tick={{ fontSize: 10 }} />
                                <YAxis domain={[0, 100]} tick={{ fontSize: 10 }} label={{ value: "Percent", angle: -90, position: "insideLeft", fontSize: 10 }} />
                                <RechartsTooltip />
                                <Bar dataKey="actual" fill="#22c55e" />
                                <Bar dataKey="kyc" fill="#3b82f6" />
                              </BarChart>
                            </ResponsiveContainer>
                            <div className="flex justify-center gap-4 mt-2">
                              <div className="flex items-center gap-1">
                                <div className="w-3 h-3 bg-green-500"></div>
                                <span className="text-[10px] text-gray-700">Actual Risk Distribution</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <div className="w-3 h-3 bg-blue-500"></div>
                                <span className="text-[10px] text-gray-700">KYC Risk Tolerance</span>
                              </div>
                            </div>
                          </div>

                          {/* Current Risk Score Bar Chart */}
                          <div>
                            <h4 className="text-xs font-semibold text-gray-900 mb-2 text-center">Current Risk Score: 121.00</h4>
                            <ResponsiveContainer width="100%" height={200}>
                              <BarChart 
                                data={[{ name: "", actual: 121, kyc: 256 }]} 
                                layout="vertical"
                                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                              >
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis type="number" domain={[0, 256]} tick={{ fontSize: 10 }} />
                                <YAxis type="category" dataKey="name" hide />
                                <RechartsTooltip />
                                <Bar dataKey="actual" fill="#22c55e" />
                                <Bar dataKey="kyc" fill="#3b82f6" />
                              </BarChart>
                            </ResponsiveContainer>
                            <div className="flex justify-center gap-4 mt-2">
                              <div className="flex items-center gap-1">
                                <div className="w-3 h-3 bg-green-500"></div>
                                <span className="text-[10px] text-gray-700">Actual Risk Score</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <div className="w-3 h-3 bg-blue-500"></div>
                                <span className="text-[10px] text-gray-700">KYC Risk Score Tolerance</span>
                              </div>
                            </div>
                          </div>

                          {/* Investment Objectives Bar Chart */}
                          <div>
                            <h4 className="text-xs font-semibold text-gray-900 mb-2 text-center">Investment Objectives</h4>
                            <ResponsiveContainer width="100%" height={200}>
                              <BarChart data={[
                                { category: "Safety", actual: 0, kyc: 0 },
                                { category: "Income", actual: 50, kyc: 0 },
                                { category: "Growth", actual: 50, kyc: 100 },
                                { category: "Speculation", actual: 0, kyc: 0 },
                              ]}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="category" tick={{ fontSize: 9 }} angle={-45} textAnchor="end" height={60} />
                                <YAxis domain={[0, 100]} tick={{ fontSize: 10 }} label={{ value: "Percent", angle: -90, position: "insideLeft", fontSize: 10 }} />
                                <RechartsTooltip />
                                <Bar dataKey="actual" fill="#22c55e" />
                                <Bar dataKey="kyc" fill="#3b82f6" />
                              </BarChart>
                            </ResponsiveContainer>
                            <div className="flex justify-center gap-4 mt-2">
                              <div className="flex items-center gap-1">
                                <div className="w-3 h-3 bg-green-500"></div>
                                <span className="text-[10px] text-gray-700">Actual Objective Distribution</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <div className="w-3 h-3 bg-blue-500"></div>
                                <span className="text-[10px] text-gray-700">KYC Objective Tolerance</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="beneficiaries" className="mt-4">
                    <div className="space-y-4">
                      {/* Beneficiary Information Section */}
                      <div className="bg-white p-4 rounded border border-gray-200">
                        <h3 className="text-sm font-semibold text-blue-600 mb-4 pb-2 border-b-2 border-blue-600">Beneficiary Information</h3>
                        
                        {/* Red Warning Message */}
                        <div className="mb-4">
                          <p className="text-xs text-red-600 font-medium">CDIC Unique identifier must be assigned to the Beneficiaries by April 2022</p>
                        </div>

                        {/* Beneficiaries Sub-section */}
                        <div className="space-y-3">
                          <h4 className="text-sm font-semibold text-gray-900">Beneficiaries</h4>
                          
                          {/* Beneficiary Entry */}
                          <div className="flex items-center justify-between p-3 bg-gray-50 rounded border border-gray-200">
                            <div className="flex items-center gap-3 flex-1">
                              <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                              <div className="flex items-center gap-4">
                                <span className="text-xs font-medium text-gray-900">Lynch, Martha</span>
                                <span className="text-xs text-gray-700">Child</span>
                                <span className="text-xs text-gray-700">100.0 %</span>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <Button size="sm" variant="outline" className="bg-blue-600 hover:bg-blue-700 text-white border-blue-600 text-xs h-7">
                                Select
                              </Button>
                              <Button size="sm" variant="outline" className="bg-blue-600 hover:bg-blue-700 text-white border-blue-600 text-xs h-7">
                                Assign CDIC Unique Identifier
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="actions" className="mt-4">
                    <div className="space-y-6">
                      {/* Forms Section */}
                      <div className="bg-white p-4 rounded border border-gray-200">
                        <h3 className="text-sm font-semibold text-gray-900 mb-4 pb-2 border-b border-gray-300">Forms</h3>
                        <div>
                          <Button className="bg-blue-600 hover:bg-blue-700 text-white text-xs h-8 w-full sm:w-auto">
                            Fast Forms
                          </Button>
                        </div>
                      </div>

                      {/* Compliance Section */}
                      <div className="bg-white p-4 rounded border border-gray-200">
                        <h3 className="text-sm font-semibold text-gray-900 mb-4 pb-2 border-b border-gray-300">Compliance</h3>
                        <div className="space-y-3">
                          <Button className="bg-blue-600 hover:bg-blue-700 text-white text-xs h-8 w-full sm:w-auto">
                            Portfolio Modeling
                          </Button>
                          <Button className="bg-blue-600 hover:bg-blue-700 text-white text-xs h-8 w-full sm:w-auto">
                            Plan Supervision
                          </Button>
                        </div>
                      </div>

                      {/* Other Section */}
                      <div className="bg-white p-4 rounded border border-gray-200">
                        <h3 className="text-sm font-semibold text-gray-900 mb-4 pb-2 border-b border-gray-300">Other</h3>
                        <div>
                          <Button className="bg-blue-600 hover:bg-blue-700 text-white text-xs h-8 w-full sm:w-auto">
                            Start KYP Review
                          </Button>
                        </div>
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="trust-account" className="mt-4">
                    <div className="space-y-4">
                      {/* Action Buttons */}
                      <div className="flex items-center gap-2">
                        <Button className="bg-green-600 hover:bg-green-700 text-white text-xs h-8">
                          New Deposit
                        </Button>
                        <Button className="bg-green-600 hover:bg-green-700 text-white text-xs h-8">
                          New Transfer
                        </Button>
                      </div>

                      {/* Search Filter Section */}
                      <div className="bg-white p-4 rounded border border-gray-200">
                        <h3 className="text-sm font-semibold text-blue-600 mb-4 pb-2 border-b-2 border-blue-600">Search Filter</h3>
                        <div className="flex items-end gap-3">
                          <div className="flex-1">
                            <Label className="text-xs text-gray-700 mb-1 block">Trust Account</Label>
                            <Select defaultValue="bm-tr">
                              <SelectTrigger className="h-8 text-sm">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="bm-tr">BM TR</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <Button className="bg-blue-600 hover:bg-blue-700 text-white text-xs h-8">
                            Show
                          </Button>
                        </div>
                      </div>

                      {/* Results Section */}
                      <div className="bg-white p-4 rounded border border-gray-200">
                        <h3 className="text-sm font-semibold text-blue-600 mb-4 pb-2 border-b-2 border-blue-600">Results</h3>
                        <div className="py-8">
                          <p className="text-xs text-gray-500 italic text-center">No trust transactions found.</p>
                        </div>
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="reviews" className="mt-4">
                    <div className="space-y-4">
                      {/* Add New Response Button */}
                      <div>
                        <Button className="bg-green-600 hover:bg-green-700 text-white text-xs h-8">
                          Add New Response
                        </Button>
                      </div>

                      {/* Reviews Section */}
                      <div className="bg-white p-4 rounded border border-gray-200">
                        <h3 className="text-sm font-semibold text-gray-900 mb-4 pb-2 border-b-2 border-blue-600">Reviews</h3>
                        <div className="py-8">
                          <p className="text-xs text-gray-500 text-center">No reviews found</p>
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
                )}
              </div>
            </div>
          </div>
          </div>
        )}

        {clientViewTab === "notes" && (
          <div className="space-y-6">
            {/* Notes Summary Section */}
            <div>
              <h2 className="text-base font-semibold text-blue-600 border-b border-blue-600 pb-2 mb-4">
                Notes Summary
              </h2>
              
              {/* Action Buttons Row */}
              <div className="flex items-center gap-4 mb-4 flex-wrap">
                <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Client Note
                </Button>
                
                <div className="flex items-center gap-2 flex-1 min-w-[300px]">
                  <div className="relative flex-1">
                    <Input
                      placeholder="View Additional Notes"
                      className="pr-8"
                    />
                    <Button
                      variant="ghost"
                      size="sm"
                      className="absolute right-1 top-1/2 transform -translate-y-1/2 h-6 w-6 p-0 text-blue-600 hover:text-blue-700"
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                  <Button variant="outline" size="sm" className="bg-blue-50 text-blue-600 border-blue-200 hover:bg-blue-100">
                    All
                  </Button>
                  <Button variant="outline" size="sm" className="bg-blue-50 text-blue-600 border-blue-200 hover:bg-blue-100">
                    None
                  </Button>
                </div>
              </div>
              
              {/* Print Notes Button */}
              <div className="mb-6">
                <Button variant="outline" size="sm" className="bg-blue-50 text-blue-600 border-blue-200 hover:bg-blue-100">
                  <FileText className="h-4 w-4 mr-2" />
                  Print Notes
                </Button>
              </div>

              {/* Notes List - Placeholder for now */}
              <Card className="border border-gray-200 shadow-sm">
                <CardContent className="p-6">
                  <p className="text-sm text-gray-500 text-center">No notes available. Click "Add Client Note" to create one.</p>
                </CardContent>
              </Card>
            </div>
          </div>
        )}

        {clientViewTab === "approvals" && (
          <div className="space-y-4">
            {/* Filters and Actions */}
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Checkbox id="include-completed" defaultChecked />
                <Label htmlFor="include-completed" className="text-xs text-gray-700 cursor-pointer">Include Completed</Label>
              </div>
              <div className="flex items-center gap-2">
                <Checkbox id="include-canceled" defaultChecked />
                <Label htmlFor="include-canceled" className="text-xs text-gray-700 cursor-pointer">Include Canceled</Label>
              </div>
              <Button className="bg-blue-600 hover:bg-blue-700 text-white text-xs h-8">
                <RefreshCw className="h-3 w-3 mr-2" />
                Refresh
              </Button>
            </div>

            {/* Pagination - Top */}
            <div className="flex items-center justify-center gap-4">
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="sm" className="h-7 w-7 p-0 text-xs">
                  |&lt;
                </Button>
                <Button variant="ghost" size="sm" className="h-7 w-7 p-0 text-xs">
                  &lt;&lt;
                </Button>
                <Button className="bg-blue-600 hover:bg-blue-700 text-white h-7 w-7 p-0 text-xs">
                  1
                </Button>
                <Button variant="ghost" size="sm" className="h-7 w-7 p-0 text-xs">
                  &gt;&gt;
                </Button>
                <Button variant="ghost" size="sm" className="h-7 w-7 p-0 text-xs">
                  &gt;|
                </Button>
              </div>
              <div className="flex items-center gap-2">
                <Label className="text-xs text-gray-700">Items per page:</Label>
                <Select defaultValue="25">
                  <SelectTrigger className="h-7 text-xs w-16">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="25">25</SelectItem>
                    <SelectItem value="50">50</SelectItem>
                    <SelectItem value="100">100</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Approvals Table */}
            <div className="bg-white rounded border border-gray-200">
              <Table>
                <TableHeader>
                  <TableRow className="bg-gray-50">
                    <TableHead className="text-xs font-semibold text-gray-700 py-2 px-3">
                      <div className="flex items-center gap-1">
                        Description
                        <ChevronUp className="h-3 w-3 text-gray-500" />
                      </div>
                    </TableHead>
                    <TableHead className="text-xs font-semibold text-blue-600 py-2 px-3">
                      <div className="flex items-center gap-1">
                        Date Created
                        <ChevronUp className="h-3 w-3 text-blue-600" />
                      </div>
                    </TableHead>
                    <TableHead className="text-xs font-semibold text-gray-700 py-2 px-3">
                      <div className="flex items-center gap-1">
                        Date Completed
                        <ChevronUp className="h-3 w-3 text-gray-500" />
                      </div>
                    </TableHead>
                    <TableHead className="text-xs font-semibold text-gray-700 py-2 px-3">
                      <div className="flex items-center gap-1">
                        Type
                        <ChevronUp className="h-3 w-3 text-gray-500" />
                      </div>
                    </TableHead>
                    <TableHead className="text-xs font-semibold text-gray-700 py-2 px-3">
                      <div className="flex items-center gap-1">
                        Status
                        <ChevronUp className="h-3 w-3 text-gray-500" />
                      </div>
                    </TableHead>
                    <TableHead className="text-xs font-semibold text-gray-700 py-2 px-3">
                      <div className="flex items-center gap-1">
                        Created From
                        <ChevronUp className="h-3 w-3 text-gray-500" />
                      </div>
                    </TableHead>
                    <TableHead className="text-xs font-semibold text-gray-700 py-2 px-3"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="text-xs py-2 px-3">Please review</TableCell>
                    <TableCell className="text-xs py-2 px-3">09/19/2022 11:12</TableCell>
                    <TableCell className="text-xs py-2 px-3"></TableCell>
                    <TableCell className="text-xs py-2 px-3">Docusign Envelope</TableCell>
                    <TableCell className="text-xs py-2 px-3">Cancelled</TableCell>
                    <TableCell className="text-xs py-2 px-3">Account Opening, Plan</TableCell>
                    <TableCell className="text-xs py-2 px-3">
                      <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-white text-xs h-7">
                        View
                      </Button>
                    </TableCell>
                  </TableRow>
                  <TableRow className="bg-gray-50">
                    <TableCell className="text-xs py-2 px-3">Please review</TableCell>
                    <TableCell className="text-xs py-2 px-3">09/19/2022 11:16</TableCell>
                    <TableCell className="text-xs py-2 px-3"></TableCell>
                    <TableCell className="text-xs py-2 px-3">Docusign Envelope</TableCell>
                    <TableCell className="text-xs py-2 px-3">Cancelled</TableCell>
                    <TableCell className="text-xs py-2 px-3">Account Opening, Plan</TableCell>
                    <TableCell className="text-xs py-2 px-3">
                      <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-white text-xs h-7">
                        View
                      </Button>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="text-xs py-2 px-3"></TableCell>
                    <TableCell className="text-xs py-2 px-3">08/12/2024 10:35</TableCell>
                    <TableCell className="text-xs py-2 px-3"></TableCell>
                    <TableCell className="text-xs py-2 px-3">Docusign Envelope</TableCell>
                    <TableCell className="text-xs py-2 px-3">Completed</TableCell>
                    <TableCell className="text-xs py-2 px-3">
                      <div className="flex items-center gap-1">
                        Fast Forms
                        <Bell className="h-3 w-3 text-red-600" />
                      </div>
                    </TableCell>
                    <TableCell className="text-xs py-2 px-3">
                      <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-white text-xs h-7">
                        View
                      </Button>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>

            {/* Pagination - Bottom */}
            <div className="flex items-center justify-center gap-4">
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="sm" className="h-7 w-7 p-0 text-xs">
                  |&lt;
                </Button>
                <Button variant="ghost" size="sm" className="h-7 w-7 p-0 text-xs">
                  &lt;&lt;
                </Button>
                <Button className="bg-blue-600 hover:bg-blue-700 text-white h-7 w-7 p-0 text-xs">
                  1
                </Button>
                <Button variant="ghost" size="sm" className="h-7 w-7 p-0 text-xs">
                  &gt;&gt;
                </Button>
                <Button variant="ghost" size="sm" className="h-7 w-7 p-0 text-xs">
                  &gt;|
                </Button>
              </div>
              <div className="flex items-center gap-2">
                <Label className="text-xs text-gray-700">Items per page:</Label>
                <Select defaultValue="25">
                  <SelectTrigger className="h-7 text-xs w-16">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="25">25</SelectItem>
                    <SelectItem value="50">50</SelectItem>
                    <SelectItem value="100">100</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        )}

        {clientViewTab === "attachments" && (
          <div className="space-y-4">
            {/* Secondary Navigation Tabs */}
            <Tabs value={attachmentsSubTab} onValueChange={(value) => setAttachmentsSubTab(value as "rep-attachments" | "dealer-attachments" | "statement-history" | "trade-confirmations")}>
              <TabsList className="grid w-full grid-cols-4 h-8 mb-4">
                <TabsTrigger value="rep-attachments" className="text-xs">
                  Rep Attachments
                  <HelpCircle className="h-3 w-3 ml-1" />
                </TabsTrigger>
                <TabsTrigger value="dealer-attachments" className="text-xs">Dealer Attachments</TabsTrigger>
                <TabsTrigger value="statement-history" className="text-xs">Statement History</TabsTrigger>
                <TabsTrigger value="trade-confirmations" className="text-xs">Trade Confirmations</TabsTrigger>
              </TabsList>

              <TabsContent value="rep-attachments" className="mt-4">
                <div className="space-y-4">
                  {/* Action Buttons */}
                  <div className="flex items-center gap-2">
                    <Button className="bg-green-600 hover:bg-green-700 text-white text-xs h-8">
                      Add New Attachment
                    </Button>
                    <Button className="bg-blue-600 hover:bg-blue-700 text-white text-xs h-8">
                      Download All Attachments
                    </Button>
                  </div>

                  {/* Filter Checkboxes */}
                  <div className="flex items-center gap-6 flex-wrap">
                    <div className="flex items-center gap-2">
                      <Checkbox id="include-inactive-attachments-filter" />
                      <Label htmlFor="include-inactive-attachments-filter" className="text-xs text-gray-700 cursor-pointer">Include Inactive Attachments</Label>
                    </div>
                    <div className="flex items-center gap-2">
                      <Checkbox id="include-plans-attachments" defaultChecked />
                      <Label htmlFor="include-plans-attachments" className="text-xs text-gray-700 cursor-pointer">Include attachments from Plans, Funds, GICs, Transactions, and Trust Transactions</Label>
                    </div>
                    <div className="flex items-center gap-2">
                      <Checkbox id="tree-view" />
                      <Label htmlFor="tree-view" className="text-xs text-gray-700 cursor-pointer">Tree View</Label>
                    </div>
                    <div className="flex items-center gap-2">
                      <Checkbox id="show-pinned-documents" />
                      <Label htmlFor="show-pinned-documents" className="text-xs text-gray-700 cursor-pointer">Show Pinned Documents</Label>
                    </div>
                  </div>

                  {/* Attachments Table */}
                  <div className="bg-white rounded border border-gray-200">
                    {/* Pagination - Top */}
                    <div className="flex items-center justify-between p-3 border-b border-gray-200">
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-gray-700">1-3 of 3 records</span>
                        <Button variant="ghost" size="sm" className="h-7 w-7 p-0 text-xs">
                          &lt;&lt;
                        </Button>
                        <Button variant="ghost" size="sm" className="h-7 w-7 p-0 text-xs">
                          &lt;
                        </Button>
                        <Button className="bg-blue-600 hover:bg-blue-700 text-white h-7 w-7 p-0 text-xs">
                          1
                        </Button>
                        <Button variant="ghost" size="sm" className="h-7 w-7 p-0 text-xs">
                          &gt;
                        </Button>
                        <Button variant="ghost" size="sm" className="h-7 w-7 p-0 text-xs">
                          &gt;&gt;
                        </Button>
                      </div>
                      <div className="flex items-center gap-2">
                        <Select defaultValue="25">
                          <SelectTrigger className="h-7 text-xs w-16">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="25">25</SelectItem>
                            <SelectItem value="50">50</SelectItem>
                            <SelectItem value="100">100</SelectItem>
                          </SelectContent>
                        </Select>
                        <span className="text-xs text-gray-700">Select * For All</span>
                      </div>
                    </div>

                    <Table>
                      <TableHeader>
                        <TableRow className="bg-gray-50">
                          <TableHead className="text-xs font-semibold text-gray-700 py-2 px-3">
                            <div className="flex flex-col gap-1">
                              <div className="flex items-center gap-1">
                                Date Submitted
                                <ChevronUp className="h-3 w-3 text-gray-500" />
                              </div>
                              <Input className="h-6 text-xs" placeholder="" />
                            </div>
                          </TableHead>
                          <TableHead className="text-xs font-semibold text-gray-700 py-2 px-3">
                            <div className="flex flex-col gap-1">
                              <div className="flex items-center gap-1">
                                Document Type
                                <ChevronUp className="h-3 w-3 text-gray-500" />
                              </div>
                              <Input className="h-6 text-xs" placeholder="" />
                            </div>
                          </TableHead>
                          <TableHead className="text-xs font-semibold text-gray-700 py-2 px-3">
                            <div className="flex flex-col gap-1">
                              <div className="flex items-center gap-1">
                                Attachment Description
                                <ChevronUp className="h-3 w-3 text-gray-500" />
                              </div>
                              <Input className="h-6 text-xs" placeholder="" />
                            </div>
                          </TableHead>
                          <TableHead className="text-xs font-semibold text-gray-700 py-2 px-3">
                            <div className="flex items-center gap-1">
                              Visible Status to Client
                              <Eye className="h-3 w-3 text-gray-500" />
                              <Star className="h-3 w-3 text-gray-500" />
                            </div>
                          </TableHead>
                          <TableHead className="text-xs font-semibold text-gray-700 py-2 px-3">
                            <div className="flex items-center gap-1">
                              Compliance Reviews
                              <Bell className="h-3 w-3 text-gray-500" />
                            </div>
                          </TableHead>
                          <TableHead className="text-xs font-semibold text-gray-700 py-2 px-3"></TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        <TableRow>
                          <TableCell className="text-xs py-2 px-3">03/20/2020</TableCell>
                          <TableCell className="text-xs py-2 px-3">Void Cheque</TableCell>
                          <TableCell className="text-xs py-2 px-3">attachment</TableCell>
                          <TableCell className="text-xs py-2 px-3">
                            <div className="flex items-center gap-1">
                              <CheckCircle2 className="h-4 w-4 text-green-600" />
                              <Eye className="h-4 w-4 text-blue-600" />
                            </div>
                          </TableCell>
                          <TableCell className="text-xs py-2 px-3">
                            <div className="flex items-center gap-1">
                              <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-white text-xs h-6">
                                Notify
                              </Button>
                              <Bell className="h-3 w-3 text-gray-500" />
                            </div>
                          </TableCell>
                          <TableCell className="text-xs py-2 px-3">
                            <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-white text-xs h-7">
                              View
                            </Button>
                          </TableCell>
                        </TableRow>
                        <TableRow className="bg-gray-50">
                          <TableCell className="text-xs py-2 px-3">03/19/2020</TableCell>
                          <TableCell className="text-xs py-2 px-3">Client Dual Occupation Disclosure</TableCell>
                          <TableCell className="text-xs py-2 px-3">attachment</TableCell>
                          <TableCell className="text-xs py-2 px-3">
                            <div className="flex items-center gap-1">
                              <CheckCircle2 className="h-4 w-4 text-green-600" />
                              <Eye className="h-4 w-4 text-blue-600" />
                            </div>
                          </TableCell>
                          <TableCell className="text-xs py-2 px-3">
                            <div className="flex items-center gap-1">
                              <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-white text-xs h-6">
                                Notify
                              </Button>
                              <Bell className="h-3 w-3 text-gray-500" />
                            </div>
                          </TableCell>
                          <TableCell className="text-xs py-2 px-3">
                            <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-white text-xs h-7">
                              View
                            </Button>
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="text-xs py-2 px-3">03/19/2020</TableCell>
                          <TableCell className="text-xs py-2 px-3">Estatement consent</TableCell>
                          <TableCell className="text-xs py-2 px-3">attachment</TableCell>
                          <TableCell className="text-xs py-2 px-3">
                            <div className="flex items-center gap-1">
                              <CheckCircle2 className="h-4 w-4 text-green-600" />
                              <Eye className="h-4 w-4 text-blue-600" />
                            </div>
                          </TableCell>
                          <TableCell className="text-xs py-2 px-3">
                            <div className="flex items-center gap-1">
                              <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-white text-xs h-6">
                                Notify
                              </Button>
                              <Bell className="h-3 w-3 text-gray-500" />
                            </div>
                          </TableCell>
                          <TableCell className="text-xs py-2 px-3">
                            <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-white text-xs h-7">
                              View
                            </Button>
                          </TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>

                    {/* Pagination - Bottom */}
                    <div className="flex items-center justify-between p-3 border-t border-gray-200">
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-gray-700">1-3 of 3 records</span>
                        <Button variant="ghost" size="sm" className="h-7 w-7 p-0 text-xs">
                          &lt;&lt;
                        </Button>
                        <Button variant="ghost" size="sm" className="h-7 w-7 p-0 text-xs">
                          &lt;
                        </Button>
                        <Button className="bg-blue-600 hover:bg-blue-700 text-white h-7 w-7 p-0 text-xs">
                          1
                        </Button>
                        <Button variant="ghost" size="sm" className="h-7 w-7 p-0 text-xs">
                          &gt;
                        </Button>
                        <Button variant="ghost" size="sm" className="h-7 w-7 p-0 text-xs">
                          &gt;&gt;
                        </Button>
                      </div>
                      <div className="flex items-center gap-2">
                        <Select defaultValue="25">
                          <SelectTrigger className="h-7 text-xs w-16">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="25">25</SelectItem>
                            <SelectItem value="50">50</SelectItem>
                            <SelectItem value="100">100</SelectItem>
                          </SelectContent>
                        </Select>
                        <span className="text-xs text-gray-700">Select * For All</span>
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="dealer-attachments" className="mt-4">
                <div className="space-y-4">
                  {/* Section Header */}
                  <div>
                    <h3 className="text-sm font-semibold text-black mb-2 pb-2 border-b-2 border-gray-300">Attachments</h3>
                  </div>

                  {/* Include Rep Attachments Checkbox */}
                  <div className="flex items-center gap-2">
                    <Checkbox id="include-rep-attachments" />
                    <Label htmlFor="include-rep-attachments" className="text-xs text-gray-700 cursor-pointer">Include Rep Attachments</Label>
                  </div>

                  {/* Pagination - Top */}
                  <div className="flex items-center gap-4">
                    <span className="text-xs text-gray-700">0-0 of 0 records</span>
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="sm" className="h-7 w-7 p-0 text-xs">
                        |&lt;
                      </Button>
                      <Button variant="ghost" size="sm" className="h-7 w-7 p-0 text-xs">
                        &lt;&lt;
                      </Button>
                      <Button variant="ghost" size="sm" className="h-7 w-7 p-0 text-xs">
                        &gt;&gt;
                      </Button>
                      <Button variant="ghost" size="sm" className="h-7 w-7 p-0 text-xs">
                        &gt;|
                      </Button>
                    </div>
                    <Select defaultValue="25">
                      <SelectTrigger className="h-7 text-xs w-16">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="25">25</SelectItem>
                        <SelectItem value="50">50</SelectItem>
                        <SelectItem value="100">100</SelectItem>
                      </SelectContent>
                    </Select>
                    <span className="text-xs text-gray-700">Select * For All</span>
                  </div>

                  {/* Attachments Table */}
                  <div className="bg-white rounded border border-gray-200">
                    <Table>
                      <TableHeader>
                        <TableRow className="bg-gray-50">
                          <TableHead className="text-xs font-semibold text-gray-700 py-2 px-3">
                            <div className="flex flex-col gap-1">
                              <div className="flex items-center gap-1">
                                Document Type
                                <ChevronUp className="h-3 w-3 text-gray-500" />
                              </div>
                              <Input className="h-6 text-xs" placeholder="" />
                            </div>
                          </TableHead>
                          <TableHead className="text-xs font-semibold text-gray-700 py-2 px-3">
                            <div className="flex flex-col gap-1">
                              <div className="flex items-center gap-1">
                                Attachment Description
                                <ChevronUp className="h-3 w-3 text-gray-500" />
                              </div>
                              <Input className="h-6 text-xs" placeholder="" />
                            </div>
                          </TableHead>
                          <TableHead className="text-xs font-semibold text-gray-700 py-2 px-3">
                            <div className="flex flex-col gap-1">
                              <div className="flex items-center gap-1">
                                Date Scanned
                                <ChevronUp className="h-3 w-3 text-gray-500" />
                              </div>
                              <Input className="h-6 text-xs" placeholder="" />
                            </div>
                          </TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        <TableRow>
                          <TableCell colSpan={3} className="text-center py-8">
                            <p className="text-xs text-gray-500">No attachments found</p>
                          </TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </div>

                  {/* Pagination - Bottom */}
                  <div className="flex items-center gap-4">
                    <span className="text-xs text-gray-700">0-0 of 0 records</span>
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="sm" className="h-7 w-7 p-0 text-xs">
                        |&lt;
                      </Button>
                      <Button variant="ghost" size="sm" className="h-7 w-7 p-0 text-xs">
                        &lt;&lt;
                      </Button>
                      <Button variant="ghost" size="sm" className="h-7 w-7 p-0 text-xs">
                        &gt;&gt;
                      </Button>
                      <Button variant="ghost" size="sm" className="h-7 w-7 p-0 text-xs">
                        &gt;|
                      </Button>
                    </div>
                    <Select defaultValue="25">
                      <SelectTrigger className="h-7 text-xs w-16">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="25">25</SelectItem>
                        <SelectItem value="50">50</SelectItem>
                        <SelectItem value="100">100</SelectItem>
                      </SelectContent>
                    </Select>
                    <span className="text-xs text-gray-700">Select * For All</span>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="statement-history" className="mt-4">
                <div className="space-y-4">
                  {/* Section Header */}
                  <div>
                    <h3 className="text-sm font-semibold text-black mb-2 pb-2 border-b-2 border-gray-300">Statement History</h3>
                  </div>

                  {/* Pagination - Top */}
                  <div className="bg-blue-50 px-4 py-2 rounded border border-blue-200 flex items-center gap-4">
                    <span className="text-xs text-gray-700">0-0 of 0 records</span>
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="sm" className="h-7 w-7 p-0 text-xs">
                        |&lt;
                      </Button>
                      <Button variant="ghost" size="sm" className="h-7 w-7 p-0 text-xs">
                        &lt;&lt;
                      </Button>
                      <Button variant="ghost" size="sm" className="h-7 w-7 p-0 text-xs">
                        &gt;&gt;
                      </Button>
                      <Button variant="ghost" size="sm" className="h-7 w-7 p-0 text-xs">
                        &gt;|
                      </Button>
                    </div>
                    <Select defaultValue="25">
                      <SelectTrigger className="h-7 text-xs w-16">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="25">25</SelectItem>
                        <SelectItem value="50">50</SelectItem>
                        <SelectItem value="100">100</SelectItem>
                      </SelectContent>
                    </Select>
                    <span className="text-xs text-gray-700">Select * For All</span>
                  </div>

                  {/* Statement History Table */}
                  <div className="bg-white rounded border border-gray-200">
                    <Table>
                      <TableHeader>
                        <TableRow className="bg-gray-50">
                          <TableHead className="text-xs font-semibold text-gray-700 py-2 px-3">
                            <div className="flex items-center gap-1">
                              Period
                              <ChevronUp className="h-3 w-3 text-gray-500" />
                            </div>
                          </TableHead>
                          <TableHead className="text-xs font-semibold text-gray-700 py-2 px-3">
                            <div className="flex items-center gap-1">
                              Dealership
                              <ChevronUp className="h-3 w-3 text-gray-500" />
                            </div>
                          </TableHead>
                          <TableHead className="text-xs font-semibold text-gray-700 py-2 px-3">Representative</TableHead>
                          <TableHead className="text-xs font-semibold text-gray-700 py-2 px-3">Viewed</TableHead>
                          <TableHead className="text-xs font-semibold text-gray-700 py-2 px-3">
                            <div className="flex items-center gap-1">
                              Viewed Date
                              <ChevronUp className="h-3 w-3 text-gray-500" />
                            </div>
                          </TableHead>
                          <TableHead className="text-xs font-semibold text-gray-700 py-2 px-3">Released</TableHead>
                          <TableHead className="text-xs font-semibold text-gray-700 py-2 px-3">
                            <div className="flex items-center gap-1">
                              Posted Date
                              <ChevronUp className="h-3 w-3 text-gray-500" />
                            </div>
                          </TableHead>
                          <TableHead className="text-xs font-semibold text-gray-700 py-2 px-3">Open</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        <TableRow>
                          <TableCell colSpan={8} className="text-center py-8">
                            <p className="text-xs text-gray-500">No records found.</p>
                          </TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </div>

                  {/* Pagination - Bottom */}
                  <div className="bg-blue-50 px-4 py-2 rounded border border-blue-200 flex items-center gap-4">
                    <span className="text-xs text-gray-700">0-0 of 0 records</span>
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="sm" className="h-7 w-7 p-0 text-xs">
                        |&lt;
                      </Button>
                      <Button variant="ghost" size="sm" className="h-7 w-7 p-0 text-xs">
                        &lt;&lt;
                      </Button>
                      <Button variant="ghost" size="sm" className="h-7 w-7 p-0 text-xs">
                        &gt;&gt;
                      </Button>
                      <Button variant="ghost" size="sm" className="h-7 w-7 p-0 text-xs">
                        &gt;|
                      </Button>
                    </div>
                    <Select defaultValue="25">
                      <SelectTrigger className="h-7 text-xs w-16">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="25">25</SelectItem>
                        <SelectItem value="50">50</SelectItem>
                        <SelectItem value="100">100</SelectItem>
                      </SelectContent>
                    </Select>
                    <span className="text-xs text-gray-700">Select * For All</span>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="trade-confirmations" className="mt-4 space-y-4">
                {/* Trade Confirmations Heading */}
                <h3 className="text-sm font-semibold text-black mb-2 pb-2 border-b-2 border-gray-300">Trade Confirmations</h3>

                {/* Pagination - Top */}
                <div className="bg-blue-50 px-4 py-2 rounded border border-blue-200 flex items-center gap-4">
                  <span className="text-xs text-gray-700">0-0 of 0 records</span>
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="sm" className="h-7 w-7 p-0 text-xs">
                      |&lt;
                    </Button>
                    <Button variant="ghost" size="sm" className="h-7 w-7 p-0 text-xs">
                      &lt;&lt;
                    </Button>
                    <Button variant="ghost" size="sm" className="h-7 w-7 p-0 text-xs">
                      &gt;&gt;
                    </Button>
                    <Button variant="ghost" size="sm" className="h-7 w-7 p-0 text-xs">
                      &gt;|
                    </Button>
                  </div>
                  <Select defaultValue="25">
                    <SelectTrigger className="h-7 text-xs w-16">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="25">25</SelectItem>
                      <SelectItem value="50">50</SelectItem>
                      <SelectItem value="100">100</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Trade Confirmations Table */}
                <div className="bg-white rounded border border-gray-200">
                  <Table>
                    <TableHeader>
                      <TableRow className="bg-blue-50">
                        <TableHead className="text-xs font-semibold text-gray-700 py-2 px-3">
                          <div className="flex items-center gap-1">
                            Plan
                            <ChevronUp className="h-3 w-3 text-gray-500" />
                          </div>
                        </TableHead>
                        <TableHead className="text-xs font-semibold text-gray-700 py-2 px-3">
                          <div className="flex items-center gap-1">
                            Date
                            <ChevronUp className="h-3 w-3 text-gray-500" />
                          </div>
                        </TableHead>
                        <TableHead className="text-xs font-semibold text-gray-700 py-2 px-3">Open</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell colSpan={3} className="text-center py-8">
                          <p className="text-xs text-gray-500">No records found.</p>
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </div>

                {/* Pagination - Bottom */}
                <div className="bg-blue-50 px-4 py-2 rounded border border-blue-200 flex items-center gap-4">
                  <span className="text-xs text-gray-700">0-0 of 0 records</span>
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="sm" className="h-7 w-7 p-0 text-xs">
                      |&lt;
                    </Button>
                    <Button variant="ghost" size="sm" className="h-7 w-7 p-0 text-xs">
                      &lt;&lt;
                    </Button>
                    <Button variant="ghost" size="sm" className="h-7 w-7 p-0 text-xs">
                      &gt;&gt;
                    </Button>
                    <Button variant="ghost" size="sm" className="h-7 w-7 p-0 text-xs">
                      &gt;|
                    </Button>
                  </div>
                  <Select defaultValue="25">
                    <SelectTrigger className="h-7 text-xs w-16">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="25">25</SelectItem>
                      <SelectItem value="50">50</SelectItem>
                      <SelectItem value="100">100</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        )}
      </div>

      {/* Deposit Dialog */}
      <Dialog open={isDepositDialogOpen} onOpenChange={setIsDepositDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-lg">
              <DollarSign className="h-5 w-5 text-gray-600" />
              Deposit to Trust Account
            </DialogTitle>
            <DialogDescription className="text-sm text-gray-600 mt-2">
              Add funds to the client's trust account
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <label className="text-sm font-semibold text-gray-700 mb-2 block">
              Amount (CAD)
            </label>
            <Input
              type="text"
              value={depositAmount === "0.00" ? "" : depositAmount}
              onChange={(e) => {
                const value = e.target.value.replace(/[^0-9.]/g, "");
                setDepositAmount(value || "0.00");
              }}
              placeholder="$0.00"
              className="text-lg font-semibold"
            />
          </div>
          <DialogFooter className="gap-2">
            <Button
              variant="outline"
              onClick={() => {
                setIsDepositDialogOpen(false);
                setDepositAmount("0.00");
              }}
            >
              Cancel
            </Button>
            <Button
              className="bg-green-600 hover:bg-green-700 text-white"
              onClick={() => {
                // Handle deposit logic here
                setIsDepositDialogOpen(false);
                setDepositAmount("0.00");
              }}
            >
              Deposit
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Buy More Units Dialog */}
      <Dialog open={isBuyUnitsDialogOpen} onOpenChange={setIsBuyUnitsDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-lg text-green-600">
              <Plus className="h-5 w-5 text-green-600" />
              Buy More Units
            </DialogTitle>
            <DialogDescription className="text-sm text-gray-600 mt-2">
              Purchase additional units of {selectedProduct?.product?.split(" Series")[0] || selectedProduct?.product || "product"}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            {/* Trust Account CAD */}
            <Card className="border border-blue-200 bg-blue-50">
              <CardContent className="p-4">
                <p className="text-xs text-gray-600 mb-2">$ Trust Account CAD</p>
                <p className="text-2xl font-bold text-gray-900 mb-2">$1,250.00</p>
                <div className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span className="text-gray-600">Settled:</span>
                    <span className="text-green-600 font-medium">$1,250.00</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-gray-600">Unsettled:</span>
                    <span className="text-orange-600 font-medium">$0.00</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Current Holdings */}
            <Card className="border border-gray-200">
              <CardContent className="p-4">
                <p className="text-sm font-semibold text-gray-900 mb-3">Current Holdings ({selectedPlan?.shortType || "RESP"})</p>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Units:</span>
                    <span className="text-gray-900 font-medium">
                      {selectedProduct?.units?.replace(" Units", "") || "1247.32"}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Price:</span>
                    <span className="text-gray-900 font-medium">
                      {selectedProduct?.price?.replace(" Per Unit", "") || "$9.41"}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Market Value:</span>
                    <span className="text-gray-900 font-medium">{selectedProduct?.marketValue || "$11,734.85"}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Investment Input */}
            <div className="space-y-4">
              <div>
                <label className="text-sm font-semibold text-gray-700 mb-2 block">
                  Investment Amount ($)
                </label>
                <Input
                  type="number"
                  value={investmentAmount}
                  onChange={(e) => {
                    const value = e.target.value;
                    setInvestmentAmount(value);
                    if (value && selectedProduct?.price) {
                      const price = parseFloat(selectedProduct.price.replace("$", "").replace(" Per Unit", ""));
                      const units = (parseFloat(value) / price).toFixed(2);
                      setNumberOfUnits(units);
                    } else {
                      setNumberOfUnits("");
                    }
                  }}
                  placeholder="Enter amount to invest"
                  className="text-lg font-semibold"
                />
              </div>
              <div>
                <label className="text-sm font-semibold text-gray-700 mb-2 block">
                  Or Number of Units
                </label>
                <Input
                  type="number"
                  value={numberOfUnits}
                  onChange={(e) => {
                    const value = e.target.value;
                    setNumberOfUnits(value);
                    if (value && selectedProduct?.price) {
                      const price = parseFloat(selectedProduct.price.replace("$", "").replace(" Per Unit", ""));
                      const amount = (parseFloat(value) * price).toFixed(2);
                      setInvestmentAmount(amount);
                    } else {
                      setInvestmentAmount("");
                    }
                  }}
                  placeholder="Enter number of units"
                  className="text-lg font-semibold"
                />
              </div>
            </div>

            {/* Estimated Cost */}
            <Card className="border border-blue-200 bg-blue-50">
              <CardContent className="p-4">
                <p className="text-sm font-semibold text-gray-900 mb-3">Estimated Cost</p>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Estimated Cost:</span>
                    <span className="text-gray-900 font-bold">${investmentAmount || "0"}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Units to purchase:</span>
                    <span className="text-gray-900 font-medium">
                      {numberOfUnits || (investmentAmount && selectedProduct?.price
                        ? (
                            parseFloat(investmentAmount) /
                            parseFloat(selectedProduct.price.replace("$", "").replace(" Per Unit", ""))
                          ).toFixed(2)
                        : "0")}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Based on avg. cost</span>
                    <span className="text-gray-900 font-medium">
                      {selectedProduct?.price?.replace(" Per Unit", "") || "$9.41"}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          <DialogFooter className="gap-2">
            <Button
              variant="outline"
              onClick={() => {
                setIsBuyUnitsDialogOpen(false);
                setInvestmentAmount("200");
                setNumberOfUnits("");
              }}
            >
              Cancel
            </Button>
            <Button
              className="bg-green-600 hover:bg-green-700 text-white"
              onClick={() => {
                // Generate order ID
                const orderId = `ORD-${Date.now()}`;
                const now = new Date();
                const orderDate = `${now.getMonth() + 1}/${now.getDate()}/${now.getFullYear()}, ${now.toLocaleTimeString()}`;
                
                const units = numberOfUnits || (investmentAmount && selectedProduct?.price
                  ? (
                      parseFloat(investmentAmount) /
                      parseFloat(selectedProduct.price.replace("$", "").replace(" Per Unit", ""))
                    ).toFixed(2)
                  : "0");
                
                setOrderDetails({
                  orderId,
                  fund: selectedProduct?.product?.split(" Series")[0] || "FIDELITY NORTHSTAR FUND",
                  plan: selectedPlan?.shortType || "RESP",
                  units: units,
                  amount: `$${investmentAmount || "0"}`,
                  time: orderDate,
                });
                
                setIsBuyUnitsDialogOpen(false);
                setIsOrderConfirmedDialogOpen(true);
                setInvestmentAmount("200");
                setNumberOfUnits("");
              }}
            >
              Place Buy Order
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Order Confirmed Dialog */}
      <Dialog open={isOrderConfirmedDialogOpen} onOpenChange={setIsOrderConfirmedDialogOpen}>
        <DialogContent className="sm:max-w-[450px]">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-lg text-green-600">
              <CheckCircle2 className="h-5 w-5 text-green-600" />
              Order Confirmed
            </DialogTitle>
            <DialogDescription className="text-sm text-gray-600 mt-2">
              Your buy order has been placed successfully
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            {/* Order Details */}
            <Card className="border border-green-200 bg-green-50">
              <CardContent className="p-4">
                <p className="text-sm font-semibold text-green-800 mb-3">Order Details:</p>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-green-700">Order ID:</span>
                    <span className="text-green-900 font-medium">{orderDetails?.orderId || "ORD-1765757958548"}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-green-700">Fund:</span>
                    <span className="text-green-900 font-medium">{orderDetails?.fund || "FIDELITY NORTHSTAR FUND"}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-green-700">Plan:</span>
                    <span className="text-green-900 font-medium">{orderDetails?.plan || "RESP"}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-green-700">Units:</span>
                    <span className="text-green-900 font-medium">{orderDetails?.units || "21.25"}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-green-700">Amount:</span>
                    <span className="text-green-900 font-medium">{orderDetails?.amount || "$200"}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-green-700">Time:</span>
                    <span className="text-green-900 font-medium">{orderDetails?.time || "12/14/2025, 7:19:18 PM"}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Processing Status */}
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="text-sm font-semibold text-gray-700">Processing Status:</span>
                <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100 font-normal px-2 py-0.5 text-xs">
                  Pending
                </Badge>
              </div>
              <p className="text-xs text-blue-600">
                Order will be processed at next market close
              </p>
            </div>
          </div>
          <DialogFooter>
            <Button
              className="w-full bg-green-600 hover:bg-green-700 text-white"
              onClick={() => {
                setIsOrderConfirmedDialogOpen(false);
                setOrderDetails(null);
              }}
            >
              Done
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Sell Units Dialog */}
      <Dialog open={isSellUnitsDialogOpen} onOpenChange={setIsSellUnitsDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-lg text-red-600">
              <Minus className="h-5 w-5 text-red-600" />
              Sell Units
            </DialogTitle>
            <DialogDescription className="text-sm text-gray-600 mt-2">
              Sell units of {selectedProduct?.product?.split(" Series")[0] || selectedProduct?.product || "product"}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            {/* Current Holdings */}
            <Card className="border border-gray-200 bg-gray-50">
              <CardContent className="p-4">
                <p className="text-sm font-semibold text-gray-900 mb-3">Current Holdings ({selectedPlan?.shortType || "RESP"})</p>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Units Available:</span>
                    <span className="text-gray-900 font-medium">
                      {selectedProduct?.units?.replace(" Units", "") || "1247.32"}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Price:</span>
                    <span className="text-gray-900 font-medium">
                      {selectedProduct?.price?.replace(" Per Unit", "") || "$9.41"}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Market Value:</span>
                    <span className="text-gray-900 font-medium">{selectedProduct?.marketValue || "$11,734.85"}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Sell Input */}
            <div className="space-y-4">
              <div>
                <label className="text-sm font-semibold text-gray-700 mb-2 block">
                  Number of Units to Sell
                </label>
                <Input
                  type="number"
                  value={sellUnits}
                  onChange={(e) => {
                    const value = e.target.value;
                    setSellUnits(value);
                    if (value && selectedProduct?.price) {
                      const price = parseFloat(selectedProduct.price.replace("$", "").replace(" Per Unit", ""));
                      const amount = (parseFloat(value) * price).toFixed(2);
                      setSellDollarAmount(amount);
                    } else {
                      setSellDollarAmount("");
                    }
                  }}
                  placeholder={`Max: ${selectedProduct?.units?.replace(" Units", "") || "1247.32"}`}
                  className="text-lg font-semibold"
                  max={selectedProduct?.units?.replace(" Units", "") || "1247.32"}
                />
              </div>
              <div>
                <label className="text-sm font-semibold text-gray-700 mb-2 block">
                  Or Dollar Amount ($)
                </label>
                <Input
                  type="number"
                  value={sellDollarAmount}
                  onChange={(e) => {
                    const value = e.target.value;
                    setSellDollarAmount(value);
                    if (value && selectedProduct?.price) {
                      const price = parseFloat(selectedProduct.price.replace("$", "").replace(" Per Unit", ""));
                      const units = (parseFloat(value) / price).toFixed(2);
                      setSellUnits(units);
                    } else {
                      setSellUnits("");
                    }
                  }}
                  placeholder="Enter dollar amount"
                  className="text-lg font-semibold"
                />
              </div>
            </div>

            {/* Estimated Proceeds */}
            <Card className="border border-orange-200 bg-orange-50">
              <CardContent className="p-4">
                <p className="text-sm font-semibold text-orange-900 mb-3">Estimated Proceeds</p>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-orange-700">Estimated Proceeds:</span>
                    <span className="text-orange-900 font-bold">
                      ${sellDollarAmount || (sellUnits && selectedProduct?.price
                        ? (parseFloat(sellUnits) * parseFloat(selectedProduct.price.replace("$", "").replace(" Per Unit", ""))).toFixed(2)
                        : "0")}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-orange-700">Units to sell:</span>
                    <span className="text-orange-900 font-medium">
                      {sellUnits || "0"}
                    </span>
                  </div>
                  <div className="text-xs text-orange-700">
                    Before fees and taxes • Based on avg. cost {selectedProduct?.price?.replace(" Per Unit", "") || "$9.41"}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          <DialogFooter className="gap-2">
            <Button
              variant="outline"
              onClick={() => {
                setIsSellUnitsDialogOpen(false);
                setSellUnits("200");
                setSellDollarAmount("");
              }}
            >
              Cancel
            </Button>
            <Button
              className="bg-red-600 hover:bg-red-700 text-white"
              onClick={() => {
                // Generate order ID
                const orderId = `ORD-${Date.now()}`;
                const now = new Date();
                const orderDate = `${now.getMonth() + 1}/${now.getDate()}/${now.getFullYear()}, ${now.toLocaleTimeString()}`;
                
                const proceeds = sellDollarAmount || (sellUnits && selectedProduct?.price
                  ? (parseFloat(sellUnits) * parseFloat(selectedProduct.price.replace("$", "").replace(" Per Unit", ""))).toFixed(2)
                  : "0");
                
                setSellOrderDetails({
                  orderId,
                  fund: selectedProduct?.product?.split(" Series")[0] || "FIDELITY NORTHSTAR FUND",
                  plan: selectedPlan?.shortType || "RESP",
                  units: sellUnits || "0",
                  proceeds: `$${proceeds}`,
                  time: orderDate,
                });
                
                setIsSellUnitsDialogOpen(false);
                setIsSellOrderConfirmedDialogOpen(true);
                setSellUnits("200");
                setSellDollarAmount("");
              }}
            >
              Place Sell Order
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Sell Order Confirmed Dialog */}
      <Dialog open={isSellOrderConfirmedDialogOpen} onOpenChange={setIsSellOrderConfirmedDialogOpen}>
        <DialogContent className="sm:max-w-[450px]">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-lg text-red-600">
              <CheckCircle2 className="h-5 w-5 text-green-600" />
              Order Confirmed
            </DialogTitle>
            <DialogDescription className="text-sm text-gray-600 mt-2">
              Your sell order has been placed successfully
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            {/* Order Details */}
            <Card className="border border-red-200 bg-red-50">
              <CardContent className="p-4">
                <p className="text-sm font-semibold text-red-800 mb-3">Order Details:</p>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-red-700">Order ID:</span>
                    <span className="text-red-900 font-medium">{sellOrderDetails?.orderId || "ORD-1765758271439"}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-red-700">Fund:</span>
                    <span className="text-red-900 font-medium">{sellOrderDetails?.fund || "FIDELITY NORTHSTAR FUND"}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-red-700">Plan:</span>
                    <span className="text-red-900 font-medium">{sellOrderDetails?.plan || "RESP"}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-red-700">Units to Sell:</span>
                    <span className="text-red-900 font-medium">{sellOrderDetails?.units || "200"}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-red-700">Estimated Proceeds:</span>
                    <span className="text-red-900 font-medium">{sellOrderDetails?.proceeds || "$1882.00"}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-red-700">Time:</span>
                    <span className="text-red-900 font-medium">{sellOrderDetails?.time || "12/14/2025, 7:24:31 PM"}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Processing Status */}
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="text-sm font-semibold text-gray-700">Processing Status:</span>
                <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100 font-normal px-2 py-0.5 text-xs">
                  Pending
                </Badge>
              </div>
              <p className="text-xs text-blue-600">
                Order will be processed at next market close
              </p>
            </div>
          </div>
          <DialogFooter>
            <Button
              className="w-full bg-red-600 hover:bg-red-700 text-white"
              onClick={() => {
                setIsSellOrderConfirmedDialogOpen(false);
                setSellOrderDetails(null);
              }}
            >
              Done
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Switch Fund Dialog */}
      <Dialog open={isSwitchDialogOpen} onOpenChange={setIsSwitchDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-lg text-blue-600">
              <ArrowLeftRight className="h-5 w-5 text-blue-600" />
              Switch Fund
            </DialogTitle>
            <DialogDescription className="text-sm text-gray-600 mt-2">
              Switch from {selectedProduct?.product?.split(" Series")[0] || "FIDELITY NORTHSTAR FUND"} to another {getProductCompany(selectedProduct)} fund
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            {/* Current Fund */}
            <Card className="border border-gray-200 bg-gray-50">
              <CardContent className="p-4">
                <p className="text-sm font-semibold text-gray-900 mb-3">Current Fund ({selectedPlan?.shortType || "RESP"}):</p>
                <p className="text-sm font-bold text-gray-900 mb-2">
                  {selectedProduct?.product?.split(" Series")[0] || "FIDELITY NORTHSTAR FUND"}
                </p>
                <div className="space-y-1 text-sm text-gray-600">
                  <div>Company: {getProductCompany(selectedProduct)}</div>
                  <div>Units Available: {selectedProduct?.units?.replace(" Units", "") || "1247.32"}</div>
                  <div>Market Value: {selectedProduct?.marketValue || "$11,734.85"}</div>
                </div>
              </CardContent>
            </Card>

            {/* Select Fund Company */}
            <div>
              <label className="text-sm font-semibold text-gray-700 mb-2 block">
                Select Fund Company
              </label>
              <div className="flex items-center gap-2 mb-2">
                <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100 font-normal px-2 py-0.5 text-xs">
                  Switch
                </Badge>
                <span className="text-xs text-gray-600">
                  ({selectedProduct?.product?.split(" Series")[0] || "FIDELITY NORTHSTAR FUND"}) → ({selectedFundCompany || "Fidelity Investments"})
                </span>
              </div>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  type="text"
                  value={companySearchTerm}
                  onChange={(e) => {
                    const search = e.target.value;
                    setCompanySearchTerm(search);
                  }}
                  placeholder="Search fund companies (e.g., Fidelity, TD, CIBC)..."
                  className="pl-10"
                />
              </div>
              <div className="mt-2 space-y-1 max-h-48 overflow-y-auto">
                {FUND_COMPANIES
                  .filter((company) =>
                    company.name.toLowerCase().includes(companySearchTerm.toLowerCase())
                  )
                  .map((company) => {
                    const currentProductCompany = getProductCompany(selectedProduct);
                    const isSameCompany = company.name === currentProductCompany;
                    
                    return (
                      <Card
                        key={company.id}
                        className={`border cursor-pointer transition-colors ${
                          selectedFundCompany === company.name
                            ? "border-blue-500 bg-blue-50"
                            : "border-gray-200 bg-gray-50 hover:bg-gray-100"
                        }`}
                        onClick={() => {
                          setSelectedFundCompany(company.name);
                          setCompanySearchTerm(company.name);
                          
                          // Check if it's the same company (switch) or different (convert)
                          if (!isSameCompany) {
                            // Different company - switch to convert dialog
                            const currentFundToSwitch = selectedFundToSwitch;
                            const currentUnits = unitsToSwitch;
                            setIsSwitchDialogOpen(false);
                            setSelectedFundToSwitch(currentFundToSwitch);
                            setUnitsToSwitch(currentUnits);
                            setIsConvertDialogOpen(true);
                          }
                        }}
                      >
                        <CardContent className="p-3">
                          <p className="text-sm font-semibold text-gray-900">{company.name}</p>
                          <p className="text-xs text-gray-600">{company.fundsCount} funds available</p>
                        </CardContent>
                      </Card>
                    );
                  })}
              </div>
            </div>

            {/* Select Fund to Convert to */}
            <div>
              <label className="text-sm font-semibold text-gray-700 mb-2 block">
                Select Fund to Convert to
              </label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  type="text"
                  value={fundSearchTerm}
                  onChange={(e) => {
                    const search = e.target.value;
                    setFundSearchTerm(search);
                    if (!search) {
                      setSelectedFundToSwitch("");
                    }
                  }}
                  placeholder={`Search ${selectedFundCompany || "Fidelity Investments"} funds by name, symbol, or category`}
                  className="pl-10"
                />
              </div>
              {selectedFundCompany && fundSearchTerm && COMPANY_FUNDS[selectedFundCompany] && (
                <div className="mt-2 space-y-1 max-h-48 overflow-y-auto">
                  {COMPANY_FUNDS[selectedFundCompany]
                    .filter((fund) =>
                      fund.name.toLowerCase().includes(fundSearchTerm.toLowerCase()) ||
                      fund.symbol.toLowerCase().includes(fundSearchTerm.toLowerCase()) ||
                      fund.category.toLowerCase().includes(fundSearchTerm.toLowerCase())
                    )
                    .map((fund, index) => (
                      <Card
                        key={index}
                        className={`border cursor-pointer transition-colors ${
                          selectedFundToSwitch === fund.name
                            ? "border-blue-500 bg-blue-50"
                            : "border-gray-200 bg-gray-50 hover:bg-gray-100"
                        }`}
                        onClick={() => {
                          setSelectedFundToSwitch(fund.name);
                          setFundSearchTerm(fund.name);
                        }}
                      >
                        <CardContent className="p-3">
                          <p className="text-sm font-semibold text-gray-900">{fund.name}</p>
                          <p className="text-xs text-gray-600">{fund.symbol} • {fund.category}</p>
                        </CardContent>
                      </Card>
                    ))}
                </div>
              )}
            </div>

            {/* Units to Switch */}
            <div>
              <label className="text-sm font-semibold text-gray-700 mb-2 block">
                Units to Switch
              </label>
              <Input
                type="number"
                value={unitsToSwitch}
                onChange={(e) => setUnitsToSwitch(e.target.value)}
                placeholder={`Max: ${selectedProduct?.units?.replace(" Units", "") || "1247.32"}`}
                max={selectedProduct?.units?.replace(" Units", "") || "1247.32"}
              />
            </div>

            {/* Switch Preview */}
            <Card className="border border-blue-200 bg-blue-50">
              <CardContent className="p-4">
                <p className="text-sm font-semibold text-blue-900 mb-3">Switch Preview:</p>
                <p className="text-sm font-bold text-blue-900 mb-2">
                  SWITCH - ({selectedProduct?.product?.split(" Series")[0] || "FIDELITY NORTHSTAR FUND"}) → ({selectedFundToSwitch || selectedFundCompany || "Fidelity Investments"})
                </p>
                <div className="space-y-1 text-sm text-blue-700">
                  <div>Units to switch: {unitsToSwitch || "0"}</div>
                  <div>
                    Estimated value: $
                    {unitsToSwitch && selectedProduct?.price
                      ? (parseFloat(unitsToSwitch) * parseFloat(selectedProduct.price.replace("$", "").replace(" Per Unit", ""))).toFixed(2)
                      : "0.00"}
                  </div>
                </div>
                <p className="text-sm text-blue-600 mt-2">
                  This will switch {selectedProduct?.product?.split(" Series")[0] || "FIDELITY NORTHSTAR FUND"} to {selectedFundToSwitch || selectedFundCompany || "Fidelity Investments"}
                </p>
              </CardContent>
            </Card>
          </div>
          <DialogFooter className="gap-2">
            <Button
              variant="outline"
              onClick={() => {
                setIsSwitchDialogOpen(false);
                setSelectedFundCompany("");
                setSelectedFundToSwitch("");
                setUnitsToSwitch("");
                setCompanySearchTerm("");
                setFundSearchTerm("");
              }}
            >
              Cancel
            </Button>
            <Button
              className="bg-blue-600 hover:bg-blue-700 text-white"
              onClick={() => {
                const orderId = `ORD-${Date.now()}`;
                const now = new Date();
                const orderDate = `${now.getMonth() + 1}/${now.getDate()}/${now.getFullYear()}, ${now.toLocaleTimeString()}`;
                
                const estimatedValue = unitsToSwitch && selectedProduct?.price
                  ? (parseFloat(unitsToSwitch) * parseFloat(selectedProduct.price.replace("$", "").replace(" Per Unit", ""))).toFixed(2)
                  : "0.00";
                
                setSwitchOrderDetails({
                  orderId,
                  from: selectedProduct?.product?.split(" Series")[0] || "FIDELITY NORTHSTAR FUND",
                  to: selectedFundToSwitch || selectedFundCompany || "Fidelity Investments",
                  plan: selectedPlan?.shortType || "RESP",
                  units: unitsToSwitch || "0",
                  estimatedValue: `$${estimatedValue}`,
                  time: orderDate,
                });
                
                setIsSwitchDialogOpen(false);
                setIsSwitchOrderConfirmedDialogOpen(true);
                setSelectedFundCompany("");
                setSelectedFundToSwitch("");
                setUnitsToSwitch("");
                setCompanySearchTerm("");
                setFundSearchTerm("");
              }}
            >
              Execute Switch
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Convert Fund Dialog */}
      <Dialog open={isConvertDialogOpen} onOpenChange={setIsConvertDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-lg text-blue-600">
              <ArrowLeftRight className="h-5 w-5 text-blue-600" />
              Convert Fund
            </DialogTitle>
            <DialogDescription className="text-sm text-gray-600 mt-2">
              Convert from {selectedProduct?.product?.split(" Series")[0] || "FIDELITY NORTHSTAR FUND"} ({getProductCompany(selectedProduct)}) to a {selectedFundCompany || "CIBC Asset Management"} fund.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            {/* Current Fund */}
            <Card className="border border-gray-200 bg-gray-50">
              <CardContent className="p-4">
                <p className="text-sm font-semibold text-gray-900 mb-3">Current Fund ({selectedPlan?.shortType || "RESP"}):</p>
                <p className="text-sm font-bold text-gray-900 mb-2">
                  {selectedProduct?.product?.split(" Series")[0] || "FIDELITY NORTHSTAR FUND"}
                </p>
                <div className="space-y-1 text-sm text-gray-600">
                  <div>Company: {getProductCompany(selectedProduct)}</div>
                  <div>Units Available: {selectedProduct?.units?.replace(" Units", "") || "1247.32"}</div>
                  <div>Market Value: {selectedProduct?.marketValue || "$11,734.85"}</div>
                </div>
              </CardContent>
            </Card>

            {/* Select Fund Company */}
            <div>
              <label className="text-sm font-semibold text-gray-700 mb-2 block">
                Select Fund Company
              </label>
              <div className="flex items-center gap-2 mb-2">
                <Badge className="bg-orange-100 text-orange-800 hover:bg-orange-100 font-normal px-2 py-0.5 text-xs">
                  Conversion
                </Badge>
                <span className="text-xs text-gray-600">
                  ({selectedProduct?.product?.split(" Series")[0] || "FIDELITY NORTHSTAR FUND"}) → ({selectedFundCompany || "CIBC Asset Management"})
                </span>
              </div>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  type="text"
                  value={companySearchTerm}
                  onChange={(e) => {
                    const search = e.target.value;
                    setCompanySearchTerm(search);
                  }}
                  placeholder="Search fund companies (e.g., CIBC, TD, RBC)..."
                  className="pl-10"
                />
              </div>
              <div className="mt-2 space-y-1 max-h-48 overflow-y-auto">
                {FUND_COMPANIES
                  .filter((company) =>
                    company.name.toLowerCase().includes(companySearchTerm.toLowerCase())
                  )
                  .map((company) => {
                    const currentProductCompany = getProductCompany(selectedProduct);
                    const isSameCompany = company.name === currentProductCompany;
                    
                    return (
                      <Card
                        key={company.id}
                        className={`border cursor-pointer transition-colors ${
                          selectedFundCompany === company.name
                            ? "border-orange-500 bg-orange-50"
                            : "border-gray-200 bg-gray-50 hover:bg-gray-100"
                        }`}
                        onClick={() => {
                          setSelectedFundCompany(company.name);
                          setCompanySearchTerm(company.name);
                          
                          // If user selects the same company, switch back to Switch dialog
                          if (isSameCompany) {
                            const currentFundToSwitch = selectedFundToSwitch;
                            const currentUnits = unitsToSwitch;
                            setIsConvertDialogOpen(false);
                            setSelectedFundToSwitch(currentFundToSwitch);
                            setUnitsToSwitch(currentUnits);
                            setIsSwitchDialogOpen(true);
                          }
                        }}
                      >
                        <CardContent className="p-3">
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="text-sm font-semibold text-gray-900">{company.name}</p>
                              <p className="text-xs text-gray-600">{company.fundsCount} funds available</p>
                            </div>
                            {isSameCompany && (
                              <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100 font-normal px-2 py-0.5 text-xs">
                                Switch
                              </Badge>
                            )}
                          </div>
                        </CardContent>
                      </Card>
                    );
                  })}
              </div>
            </div>

            {/* Select Fund to Convert to */}
            <div>
              <label className="text-sm font-semibold text-gray-700 mb-2 block">
                Select Fund to Convert to
              </label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  type="text"
                  value={fundSearchTerm}
                  onChange={(e) => {
                    const search = e.target.value;
                    setFundSearchTerm(search);
                    if (!search) {
                      setSelectedFundToSwitch("");
                    }
                  }}
                  placeholder={`Search ${selectedFundCompany || "CIBC Asset Management"} funds by name, symbol, or category`}
                  className="pl-10"
                />
              </div>
              {selectedFundCompany && fundSearchTerm && COMPANY_FUNDS[selectedFundCompany] && (
                <div className="mt-2 space-y-1 max-h-48 overflow-y-auto">
                  {COMPANY_FUNDS[selectedFundCompany]
                    .filter((fund) =>
                      fund.name.toLowerCase().includes(fundSearchTerm.toLowerCase()) ||
                      fund.symbol.toLowerCase().includes(fundSearchTerm.toLowerCase()) ||
                      fund.category.toLowerCase().includes(fundSearchTerm.toLowerCase())
                    )
                    .map((fund, index) => (
                      <Card
                        key={index}
                        className={`border cursor-pointer transition-colors ${
                          selectedFundToSwitch === fund.name
                            ? "border-orange-500 bg-orange-50"
                            : "border-gray-200 bg-gray-50 hover:bg-gray-100"
                        }`}
                        onClick={() => {
                          setSelectedFundToSwitch(fund.name);
                          setFundSearchTerm(fund.name);
                        }}
                      >
                        <CardContent className="p-3">
                          <p className="text-sm font-semibold text-gray-900">{fund.name}</p>
                          <p className="text-xs text-gray-600">{fund.symbol} • {fund.category}</p>
                        </CardContent>
                      </Card>
                    ))}
                </div>
              )}
            </div>

            {/* Units to Convert */}
            <div>
              <label className="text-sm font-semibold text-gray-700 mb-2 block">
                Units to Convert
              </label>
              <Input
                type="number"
                value={unitsToSwitch}
                onChange={(e) => setUnitsToSwitch(e.target.value)}
                placeholder={`Max: ${selectedProduct?.units?.replace(" Units", "") || "1247.32"}`}
                max={selectedProduct?.units?.replace(" Units", "") || "1247.32"}
              />
            </div>

            {/* Conversion Preview */}
            <Card className="border border-orange-200 bg-orange-50">
              <CardContent className="p-4">
                <p className="text-sm font-semibold text-orange-900 mb-3">Conversion Preview:</p>
                <p className="text-sm font-bold text-orange-900 mb-2">
                  CONVERSION - ({selectedProduct?.product?.split(" Series")[0] || "FIDELITY NORTHSTAR FUND"}) → ({selectedFundToSwitch || selectedFundCompany || "CIBC Asset Management"})
                </p>
                <div className="space-y-1 text-sm text-orange-700">
                  <div>Units to convert: {unitsToSwitch || "0"}</div>
                  <div>
                    Estimated value: $
                    {unitsToSwitch && selectedProduct?.price
                      ? (parseFloat(unitsToSwitch) * parseFloat(selectedProduct.price.replace("$", "").replace(" Per Unit", ""))).toFixed(2)
                      : "0.00"}
                  </div>
                </div>
                <p className="text-sm text-blue-600 mt-2">
                  This will convert {selectedProduct?.product?.split(" Series")[0] || "FIDELITY NORTHSTAR FUND"} to {selectedFundToSwitch || selectedFundCompany || "CIBC Asset Management"}
                </p>
              </CardContent>
            </Card>
          </div>
          <DialogFooter className="gap-2">
            <Button
              variant="outline"
              onClick={() => {
                setIsConvertDialogOpen(false);
                setSelectedFundCompany("");
                setSelectedFundToSwitch("");
                setUnitsToSwitch("");
              }}
            >
              Cancel
            </Button>
            <Button
              className="bg-blue-600 hover:bg-blue-700 text-white"
              onClick={() => {
                const orderId = `ORD-${Date.now()}`;
                const now = new Date();
                const orderDate = `${now.getMonth() + 1}/${now.getDate()}/${now.getFullYear()}, ${now.toLocaleTimeString()}`;
                
                const estimatedValue = unitsToSwitch && selectedProduct?.price
                  ? (parseFloat(unitsToSwitch) * parseFloat(selectedProduct.price.replace("$", "").replace(" Per Unit", ""))).toFixed(2)
                  : "0.00";
                
                setConvertOrderDetails({
                  orderId,
                  from: selectedProduct?.product?.split(" Series")[0] || "FIDELITY NORTHSTAR FUND",
                  to: selectedFundToSwitch || selectedFundCompany || "CIBC Asset Management",
                  plan: selectedPlan?.shortType || "RESP",
                  units: unitsToSwitch || "0",
                  estimatedValue: `$${estimatedValue}`,
                  time: orderDate,
                });
                
                setIsConvertDialogOpen(false);
                setIsConvertOrderConfirmedDialogOpen(true);
                setSelectedFundCompany("");
                setSelectedFundToSwitch("");
                setUnitsToSwitch("");
                setCompanySearchTerm("");
                setFundSearchTerm("");
              }}
            >
              Execute Conversion
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Switch Order Confirmed Dialog */}
      <Dialog open={isSwitchOrderConfirmedDialogOpen} onOpenChange={setIsSwitchOrderConfirmedDialogOpen}>
        <DialogContent className="sm:max-w-[450px]">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-lg text-blue-600">
              <CheckCircle2 className="h-5 w-5 text-green-600" />
              Switch Order Confirmed
            </DialogTitle>
            <DialogDescription className="text-sm text-gray-600 mt-2">
              Your fund switch order has been placed successfully
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            {/* Switch Order Details */}
            <Card className="border border-blue-200 bg-blue-50">
              <CardContent className="p-4">
                <p className="text-sm font-semibold text-blue-800 mb-3">Switch Order Details:</p>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-blue-700">Order ID:</span>
                    <span className="text-blue-900 font-medium">{switchOrderDetails?.orderId || "ORD-1765758488837"}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-blue-700">From:</span>
                    <span className="text-blue-900 font-medium">{switchOrderDetails?.from || "FIDELITY NORTHSTAR FUND"}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-blue-700">To:</span>
                    <span className="text-blue-900 font-medium">{switchOrderDetails?.to || "Fidelity Investments"}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-blue-700">Plan:</span>
                    <span className="text-blue-900 font-medium">{switchOrderDetails?.plan || "RESP"}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-blue-700">Units to Switch:</span>
                    <span className="text-blue-900 font-medium">{switchOrderDetails?.units || "1247.32"}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-blue-700">Time:</span>
                    <span className="text-blue-900 font-medium">{switchOrderDetails?.time || "12/14/2025, 7:28:08 PM"}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Processing Status */}
            <Card className="border border-orange-200 bg-orange-50">
              <CardContent className="p-4">
                <p className="text-sm font-semibold text-orange-800 mb-2">Processing Status: Pending</p>
                <p className="text-xs text-orange-700">
                  Switch will be processed at next market close
                </p>
              </CardContent>
            </Card>
          </div>
          <DialogFooter>
            <Button
              className="w-full bg-blue-600 hover:bg-blue-700 text-white"
              onClick={() => {
                setIsSwitchOrderConfirmedDialogOpen(false);
                setSwitchOrderDetails(null);
              }}
            >
              Done
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Convert Order Confirmed Dialog */}
      <Dialog open={isConvertOrderConfirmedDialogOpen} onOpenChange={setIsConvertOrderConfirmedDialogOpen}>
        <DialogContent className="sm:max-w-[450px]">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-lg text-blue-600">
              <CheckCircle2 className="h-5 w-5 text-green-600" />
              Conversion Order Confirmed
            </DialogTitle>
            <DialogDescription className="text-sm text-gray-600 mt-2">
              Your fund conversion order has been placed successfully
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            {/* Conversion Order Details */}
            <Card className="border border-blue-200 bg-blue-50">
              <CardContent className="p-4">
                <p className="text-sm font-semibold text-blue-800 mb-3">Conversion Order Details:</p>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-blue-700">Order ID:</span>
                    <span className="text-blue-900 font-medium">{convertOrderDetails?.orderId || "ORD-1765758488837"}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-blue-700">From:</span>
                    <span className="text-blue-900 font-medium">{convertOrderDetails?.from || "FIDELITY NORTHSTAR FUND"}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-blue-700">To:</span>
                    <span className="text-blue-900 font-medium">{convertOrderDetails?.to || "CIBC Asset Management"}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-blue-700">Plan:</span>
                    <span className="text-blue-900 font-medium">{convertOrderDetails?.plan || "RESP"}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-blue-700">Units to Convert:</span>
                    <span className="text-blue-900 font-medium">{convertOrderDetails?.units || "1200"}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-blue-700">Time:</span>
                    <span className="text-blue-900 font-medium">{convertOrderDetails?.time || "12/14/2025, 7:28:08 PM"}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Processing Status */}
            <Card className="border border-orange-200 bg-orange-50">
              <CardContent className="p-4">
                <p className="text-sm font-semibold text-orange-800 mb-2">Processing Status: Pending</p>
                <p className="text-xs text-orange-700">
                  Conversion will be processed at next market close
                </p>
              </CardContent>
            </Card>
          </div>
          <DialogFooter>
            <Button
              className="w-full bg-blue-600 hover:bg-blue-700 text-white"
              onClick={() => {
                setIsConvertOrderConfirmedDialogOpen(false);
                setConvertOrderDetails(null);
              }}
            >
              Done
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Select Plan Type Dialog */}
      <Dialog open={isSelectPlanTypeOpen} onOpenChange={setIsSelectPlanTypeOpen}>
        <DialogContent className="sm:max-w-[400px]">
          <DialogHeader>
            <DialogTitle>Select Plan Type</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <Label className="text-sm font-semibold text-gray-700 mb-2 block">
              Plan Type
            </Label>
            <Select value={selectedPlanType} onValueChange={setSelectedPlanType}>
              <SelectTrigger>
                <SelectValue placeholder="Select a plan type..." />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="OPEN">OPEN</SelectItem>
                <SelectItem value="RRSP">RRSP</SelectItem>
                <SelectItem value="RESP">RESP</SelectItem>
                <SelectItem value="TFSA">TFSA</SelectItem>
                <SelectItem value="RRIF">RRIF</SelectItem>
                <SelectItem value="Non-Registered">Non-Registered</SelectItem>
                <SelectItem value="LIRA">LIRA</SelectItem>
                <SelectItem value="LIF">LIF</SelectItem>
                <SelectItem value="RDSP">RDSP</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsSelectPlanTypeOpen(false)}>
              Cancel
            </Button>
            <Button
              className="bg-blue-600 hover:bg-blue-700 text-white"
              onClick={() => {
                if (selectedPlanType) {
                  setIsSelectPlanTypeOpen(false);
                  setPlanSetupStep(1);
                }
              }}
              disabled={!selectedPlanType}
            >
              Next
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Plan Setup Step 1 Dialog */}
      <Dialog open={planSetupStep === 1 && !isSelectPlanTypeOpen && !!selectedPlanType} onOpenChange={(open) => {
        if (!open) {
          setPlanSetupStep(0);
          setIsSelectPlanTypeOpen(false);
          setSelectedPlanType("");
        }
      }}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Plan Setup - {selectedPlanType} (Step 1 of 3)</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div>
              <Label className="text-sm font-semibold text-gray-700 mb-2 block">
                Owner/Annuitant Name <span className="text-red-500">*</span>
              </Label>
              <Input
                value={ownerName}
                onChange={(e) => setOwnerName(e.target.value)}
                placeholder="Enter owner/annuitant name"
              />
            </div>
            <div>
              <Label className="text-sm font-semibold text-gray-700 mb-2 block">
                Beneficiary Name <span className="text-red-500">*</span>
              </Label>
              <Input
                value={beneficiaryName}
                onChange={(e) => setBeneficiaryName(e.target.value)}
                placeholder="Enter beneficiary name"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => {
              setPlanSetupStep(0);
              setIsSelectPlanTypeOpen(false);
            }}>
              Cancel
            </Button>
            <Button
              className="bg-blue-600 hover:bg-blue-700 text-white"
              onClick={() => {
                if (ownerName && beneficiaryName) {
                  setPlanSetupStep(2);
                }
              }}
              disabled={!ownerName || !beneficiaryName}
            >
              Next &gt;
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Plan Setup Step 2 Dialog */}
      <Dialog open={planSetupStep === 2 && !!selectedPlanType} onOpenChange={(open) => {
        if (!open) {
          setPlanSetupStep(0);
          setIsSelectPlanTypeOpen(false);
          setSelectedPlanType("");
        }
      }}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Plan Setup - {selectedPlanType} (Step 2 of 3)</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div>
              <Label className="text-sm font-semibold text-gray-700 mb-2 block">
                Intermediary Code <span className="text-red-500">*</span>
              </Label>
              <Input
                value={intermediaryCode}
                onChange={(e) => {
                  const value = e.target.value.slice(0, 10);
                  setIntermediaryCode(value);
                }}
                placeholder="Enter intermediary code (max 10 characters)"
                maxLength={10}
              />
              <p className="text-xs text-gray-500 mt-1">{intermediaryCode.length}/10 characters</p>
            </div>
            <div>
              <Label className="text-sm font-semibold text-gray-700 mb-2 block">
                Intermediary Account Code <span className="text-red-500">*</span>
              </Label>
              <Input
                value={intermediaryAccountCode}
                onChange={(e) => {
                  const value = e.target.value.slice(0, 10);
                  setIntermediaryAccountCode(value);
                }}
                placeholder="Enter intermediary account code (max 10 characters)"
                maxLength={10}
              />
              <p className="text-xs text-gray-500 mt-1">{intermediaryAccountCode.length}/10 characters</p>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setPlanSetupStep(1)}>
              &lt; Previous
            </Button>
            <Button variant="outline" onClick={() => {
              setPlanSetupStep(0);
              setIsSelectPlanTypeOpen(false);
            }}>
              Cancel
            </Button>
            <Button
              className="bg-blue-600 hover:bg-blue-700 text-white"
              onClick={() => {
                if (intermediaryCode && intermediaryAccountCode) {
                  setPlanSetupStep(3);
                }
              }}
              disabled={!intermediaryCode || !intermediaryAccountCode}
            >
              Next &gt;
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Plan Setup Step 3 Dialog */}
      <Dialog open={planSetupStep === 3 && !!selectedPlanType} onOpenChange={(open) => {
        if (!open) {
          setPlanSetupStep(0);
          setIsSelectPlanTypeOpen(false);
          setSelectedPlanType("");
        }
      }}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Plan Setup - {selectedPlanType} (Step 3 of 3)</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div>
              <Label className="text-sm font-semibold text-gray-700 mb-2 block">
                Notes (Optional)
              </Label>
              <Textarea
                value={planNotes}
                onChange={(e) => setPlanNotes(e.target.value)}
                placeholder="Enter any additional notes..."
                className="min-h-[100px]"
              />
            </div>
            <div>
              <Label className="text-sm font-semibold text-gray-700 mb-2 block">
                Objectives <span className="text-red-500">*</span>
              </Label>
              <Input
                value={planObjectives}
                onChange={(e) => setPlanObjectives(e.target.value)}
                placeholder="Enter plan objectives"
              />
            </div>
            <div>
              <Label className="text-sm font-semibold text-gray-700 mb-2 block">
                Risk Tolerance <span className="text-red-500">*</span>
              </Label>
              <Select value={riskTolerance} onValueChange={setRiskTolerance}>
                <SelectTrigger>
                  <SelectValue placeholder="Select risk tolerance..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Conservative">Conservative</SelectItem>
                  <SelectItem value="Moderate">Moderate</SelectItem>
                  <SelectItem value="Aggressive">Aggressive</SelectItem>
                  <SelectItem value="Speculation">Speculation</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label className="text-sm font-semibold text-gray-700 mb-2 block">
                Time Horizon (Years) <span className="text-red-500">*</span>
              </Label>
              <Input
                type="number"
                value={timeHorizon}
                onChange={(e) => {
                  const value = e.target.value;
                  if (value === "" || (parseInt(value) >= 1 && parseInt(value) <= 50)) {
                    setTimeHorizon(value);
                  }
                }}
                placeholder="Enter time horizon (1-50 years)"
                min={1}
                max={50}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setPlanSetupStep(2)}>
              &lt; Previous
            </Button>
            <Button variant="outline" onClick={() => {
              setPlanSetupStep(0);
              setIsSelectPlanTypeOpen(false);
            }}>
              Cancel
            </Button>
            <Button
              className="bg-green-600 hover:bg-green-700 text-white"
              onClick={() => {
                if (planObjectives && riskTolerance && timeHorizon) {
                  // Generate plan details
                  const planId = `PLN-${Date.now()}-${Math.random().toString(36).substring(2, 10).toUpperCase()}`;
                  const accountNumber = Math.floor(1000000000 + Math.random() * 9000000000).toString();
                  
                  setCreatedPlanDetails({
                    planType: selectedPlanType,
                    planId,
                    accountNumber,
                    owner: ownerName,
                    beneficiary: beneficiaryName,
                    intermediaryCode,
                    intermediaryAccountCode,
                    notes: planNotes,
                    objectives: planObjectives,
                    riskTolerance,
                    timeHorizon,
                  });
                  
                  setPlanSetupStep(0);
                  setIsAddProductOpen(true);
                }
              }}
              disabled={!planObjectives || !riskTolerance || !timeHorizon}
            >
              Submit
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Add Product Dialog */}
      <Dialog open={isAddProductOpen} onOpenChange={setIsAddProductOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-lg text-blue-600">
              <Plus className="h-5 w-5 text-blue-600" />
              Add Product
            </DialogTitle>
            <DialogDescription className="text-sm text-gray-600 mt-2">
              Add a new investment product to your portfolio
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            {/* New Plan Created Successfully */}
            <Card className="border border-blue-200 bg-blue-50">
              <CardContent className="p-4">
                <div className="flex items-center gap-2 mb-3">
                  <CheckCircle2 className="h-5 w-5 text-green-600" />
                  <p className="text-sm font-bold text-gray-900">New Plan Created Successfully!</p>
                </div>
                <div className="space-y-1 text-sm text-gray-700">
                  <div><span className="font-semibold">Plan Type:</span> {createdPlanDetails?.planType}</div>
                  <div><span className="font-semibold">Plan ID:</span> {createdPlanDetails?.planId}</div>
                  <div><span className="font-semibold">Account Number:</span> {createdPlanDetails?.accountNumber}</div>
                  <div><span className="font-semibold">Owner:</span> {createdPlanDetails?.owner}</div>
                </div>
                <div className="flex items-center gap-2 mt-3 text-blue-600">
                  <Plus className="h-4 w-4" />
                  <span className="text-sm font-medium">Add your first investment to this plan below</span>
                </div>
              </CardContent>
            </Card>

            {/* Trust Account CAD */}
            <Card className="border border-blue-200 bg-blue-50">
              <CardContent className="p-4">
                <p className="text-xs text-gray-600 mb-2">$ Trust Account CAD</p>
                <p className="text-2xl font-bold text-gray-900 mb-2">$1,250.00</p>
                <div className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span className="text-gray-600">Settled:</span>
                    <span className="text-green-600 font-medium">$1,250.00</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-gray-600">Unsettled:</span>
                    <span className="text-orange-600 font-medium">$0.00</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Select Fund Company */}
            <div>
              <Label className="text-sm font-semibold text-gray-700 mb-2 block">
                Select Fund Company
              </Label>
              <Select value={addProductFundCompany} onValueChange={setAddProductFundCompany}>
                <SelectTrigger>
                  <SelectValue placeholder="Choose a company that offers funds" />
                </SelectTrigger>
                <SelectContent>
                  {FUND_COMPANIES.map((company) => (
                    <SelectItem key={company.id} value={company.name}>
                      {company.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Search for Specific Fund */}
            <div>
              <Label className="text-sm font-semibold text-gray-700 mb-2 block">
                Search for Specific Fund
              </Label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  type="text"
                  value={addProductFundSearch}
                  onChange={(e) => {
                    const search = e.target.value;
                    setAddProductFundSearch(search);
                    if (!search) {
                      setAddProductSelectedFund("");
                    }
                  }}
                  placeholder="Search funds by name, symbol, or category"
                  className="pl-10"
                />
              </div>
              {addProductFundCompany && addProductFundSearch && COMPANY_FUNDS[addProductFundCompany] && (
                <div className="mt-2 space-y-1 max-h-48 overflow-y-auto">
                  {COMPANY_FUNDS[addProductFundCompany]
                    .filter((fund) =>
                      fund.name.toLowerCase().includes(addProductFundSearch.toLowerCase()) ||
                      fund.symbol.toLowerCase().includes(addProductFundSearch.toLowerCase()) ||
                      fund.category.toLowerCase().includes(addProductFundSearch.toLowerCase())
                    )
                    .map((fund, index) => (
                      <Card
                        key={index}
                        className={`border cursor-pointer transition-colors ${
                          addProductSelectedFund === fund.name
                            ? "border-blue-500 bg-blue-50"
                            : "border-gray-200 bg-gray-50 hover:bg-gray-100"
                        }`}
                        onClick={() => {
                          setAddProductSelectedFund(fund.name);
                          setAddProductFundSearch(fund.name);
                        }}
                      >
                        <CardContent className="p-3">
                          <p className="text-sm font-semibold text-gray-900">{fund.name}</p>
                          <p className="text-xs text-gray-600">{fund.symbol} • {fund.category}</p>
                        </CardContent>
                      </Card>
                    ))}
                </div>
              )}
            </div>

            {/* Investment Amount */}
            <div>
              <Label className="text-sm font-semibold text-gray-700 mb-2 block">
                Investment Amount ($)
              </Label>
              <Input
                type="number"
                value={addProductAmount}
                onChange={(e) => setAddProductAmount(e.target.value)}
                placeholder="Enter amount to invest"
              />
            </div>

            {/* Order Preview */}
            <Card className="border border-blue-200 bg-blue-50">
              <CardContent className="p-4">
                <p className="text-sm font-semibold text-blue-900 mb-3">Order Preview</p>
                <div className="space-y-1 text-sm text-blue-700">
                  <div><span className="font-semibold">Fund:</span> {addProductSelectedFund || "Not selected"}</div>
                  <div><span className="font-semibold">Amount:</span> ${addProductAmount || "0"}</div>
                </div>
                <p className="text-sm text-blue-600 mt-2">
                  This will purchase the selected fund with the specified amount.
                </p>
                {addProductAmount && parseFloat(addProductAmount) > 1250 && (
                  <div className="flex items-center gap-2 mt-3 text-orange-600">
                    <AlertTriangle className="h-4 w-4" />
                    <span className="text-xs">Purchase amount exceeds settled balance ($1,250.00)</span>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddProductOpen(false)}>
              Cancel
            </Button>
            <Button
              className="bg-green-600 hover:bg-green-700 text-white"
              onClick={() => {
                if (addProductSelectedFund && addProductAmount) {
                  const selectedFund = COMPANY_FUNDS[addProductFundCompany]?.find(
                    (f) => f.name === addProductSelectedFund
                  );
                  
                  const orderId = `ORD-${Date.now()}`;
                  const now = new Date();
                  const orderDate = `${now.getMonth() + 1}/${now.getDate()}/${now.getFullYear()}, ${now.toLocaleTimeString()}`;
                  
                  setInvestmentOrderDetails({
                    orderId,
                    company: addProductFundCompany,
                    fund: addProductSelectedFund,
                    symbol: selectedFund?.symbol || "",
                    amount: `$${addProductAmount}`,
                    time: orderDate,
                  });
                  
                  setIsAddProductOpen(false);
                  setIsInvestmentOrderConfirmedOpen(true);
                }
              }}
              disabled={!addProductSelectedFund || !addProductAmount}
            >
              Place Order
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Investment Order Confirmed Dialog */}
      <Dialog open={isInvestmentOrderConfirmedOpen} onOpenChange={setIsInvestmentOrderConfirmedOpen}>
        <DialogContent className="sm:max-w-[450px]">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-lg text-blue-600">
              <CheckCircle2 className="h-5 w-5 text-green-600" />
              Investment Order Confirmed
            </DialogTitle>
            <DialogDescription className="text-sm text-gray-600 mt-2">
              Your investment order has been placed successfully
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            {/* Order Details */}
            <Card className="border border-blue-200 bg-blue-50">
              <CardContent className="p-4">
                <p className="text-sm font-semibold text-blue-800 mb-3">Order Details:</p>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-blue-700">Company:</span>
                    <span className="text-blue-900 font-medium">{investmentOrderDetails?.company || "RBC Global Asset Management"}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-blue-700">Fund:</span>
                    <span className="text-blue-900 font-medium">{investmentOrderDetails?.fund || "RBC Global Equity Fund - Series A"}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-blue-700">Symbol:</span>
                    <span className="text-blue-900 font-medium">{investmentOrderDetails?.symbol || "RBC-GLO"}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-blue-700">Amount:</span>
                    <span className="text-blue-900 font-medium">{investmentOrderDetails?.amount || "$2000"}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-blue-700">Time:</span>
                    <span className="text-blue-900 font-medium">{investmentOrderDetails?.time || "12/14/2025, 7:48:07 PM"}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Processing Status */}
            <Card className="border border-orange-200 bg-orange-50">
              <CardContent className="p-4">
                <p className="text-sm font-semibold text-orange-800 mb-2">Processing Status: Pending</p>
                <p className="text-xs text-orange-700">
                  Order will be processed at next market close
                </p>
              </CardContent>
            </Card>
          </div>
          <DialogFooter>
            <Button
              className="w-full bg-green-600 hover:bg-green-700 text-white"
              onClick={() => {
                setIsInvestmentOrderConfirmedOpen(false);
                setInvestmentOrderDetails(null);
                setAddProductFundCompany("");
                setAddProductFundSearch("");
                setAddProductSelectedFund("");
                setAddProductAmount("");
              }}
            >
              Done
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Standalone Add Product Dialog */}
      <Dialog open={isStandaloneAddProductOpen} onOpenChange={setIsStandaloneAddProductOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-lg text-blue-600">
              <Plus className="h-5 w-5 text-blue-600" />
              Add Product
            </DialogTitle>
            <DialogDescription className="text-sm text-gray-600 mt-2">
              Add a new investment product to your portfolio
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            {/* Trust Account CAD */}
            <Card className="border border-blue-200 bg-blue-50">
              <CardContent className="p-4">
                <p className="text-xs text-gray-600 mb-2">$ Trust Account CAD</p>
                <p className="text-2xl font-bold text-gray-900 mb-2">$1,250.00</p>
                <div className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span className="text-gray-600">Settled:</span>
                    <span className="text-green-600 font-medium">$1,250.00</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-gray-600">Unsettled:</span>
                    <span className="text-orange-600 font-medium">$0.00</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Select Fund Company */}
            <div>
              <Label className="text-sm font-semibold text-gray-700 mb-2 block">
                Select Fund Company
              </Label>
              <Select value={standaloneFundCompany} onValueChange={setStandaloneFundCompany}>
                <SelectTrigger>
                  <SelectValue placeholder="Choose a company that offers funds" />
                </SelectTrigger>
                <SelectContent>
                  {FUND_COMPANIES.map((company) => (
                    <SelectItem key={company.id} value={company.name}>
                      {company.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Search for Specific Fund */}
            <div>
              <Label className="text-sm font-semibold text-gray-700 mb-2 block">
                Search for Specific Fund
              </Label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  type="text"
                  value={standaloneFundSearch}
                  onChange={(e) => {
                    const search = e.target.value;
                    setStandaloneFundSearch(search);
                    if (!search) {
                      setStandaloneSelectedFund("");
                    }
                  }}
                  placeholder="Search funds by name, symbol, or category"
                  className="pl-10"
                />
              </div>
              {standaloneFundCompany && standaloneFundSearch && COMPANY_FUNDS[standaloneFundCompany] && (
                <div className="mt-2 space-y-1 max-h-48 overflow-y-auto">
                  {COMPANY_FUNDS[standaloneFundCompany]
                    .filter((fund) =>
                      fund.name.toLowerCase().includes(standaloneFundSearch.toLowerCase()) ||
                      fund.symbol.toLowerCase().includes(standaloneFundSearch.toLowerCase()) ||
                      fund.category.toLowerCase().includes(standaloneFundSearch.toLowerCase())
                    )
                    .map((fund, index) => (
                      <Card
                        key={index}
                        className={`border cursor-pointer transition-colors ${
                          standaloneSelectedFund === fund.name
                            ? "border-blue-500 bg-blue-50"
                            : "border-gray-200 bg-gray-50 hover:bg-gray-100"
                        }`}
                        onClick={() => {
                          setStandaloneSelectedFund(fund.name);
                          setStandaloneFundSearch(fund.name);
                        }}
                      >
                        <CardContent className="p-3">
                          <p className="text-sm font-semibold text-gray-900">{fund.name}</p>
                          <p className="text-xs text-gray-600">{fund.symbol} • {fund.category}</p>
                        </CardContent>
                      </Card>
                    ))}
                </div>
              )}
            </div>

            {/* Investment Amount */}
            <div>
              <Label className="text-sm font-semibold text-gray-700 mb-2 block">
                Investment Amount ($)
              </Label>
              <Input
                type="number"
                value={standaloneAmount}
                onChange={(e) => setStandaloneAmount(e.target.value)}
                placeholder="Enter amount to invest"
              />
            </div>

            {/* Order Preview */}
            <Card className="border border-blue-200 bg-blue-50">
              <CardContent className="p-4">
                <p className="text-sm font-semibold text-blue-900 mb-3">Order Preview:</p>
                <div className="space-y-1 text-sm text-blue-700">
                  <div><span className="font-semibold">Fund:</span> {standaloneSelectedFund || "Not selected"}</div>
                  <div><span className="font-semibold">Amount:</span> ${standaloneAmount || "0"}</div>
                </div>
                <p className="text-sm text-blue-600 mt-2">
                  This will purchase the selected fund with the specified amount.
                </p>
                {standaloneAmount && parseFloat(standaloneAmount) > 1250 && (
                  <div className="flex items-center gap-2 mt-3 text-orange-600">
                    <AlertTriangle className="h-4 w-4" />
                    <span className="text-xs">Purchase amount exceeds settled balance ($1,250.00)</span>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsStandaloneAddProductOpen(false)}>
              Cancel
            </Button>
            <Button
              className="bg-green-600 hover:bg-green-700 text-white"
              onClick={() => {
                if (standaloneSelectedFund && standaloneAmount) {
                  const selectedFund = COMPANY_FUNDS[standaloneFundCompany]?.find(
                    (f) => f.name === standaloneSelectedFund
                  );
                  
                  const orderId = `ORD-${Date.now()}`;
                  const now = new Date();
                  const orderDate = `${now.getMonth() + 1}/${now.getDate()}/${now.getFullYear()}, ${now.toLocaleTimeString()}`;
                  
                  setInvestmentOrderDetails({
                    orderId,
                    company: standaloneFundCompany,
                    fund: standaloneSelectedFund,
                    symbol: selectedFund?.symbol || "",
                    amount: `$${standaloneAmount}`,
                    time: orderDate,
                  });
                  
                  setIsStandaloneAddProductOpen(false);
                  setIsInvestmentOrderConfirmedOpen(true);
                }
              }}
              disabled={!standaloneSelectedFund || !standaloneAmount}
            >
              Place Order
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </PageLayout>
  );
};

export default ClientDetails;

