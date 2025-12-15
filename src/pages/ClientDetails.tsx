import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { PageLayout } from "@/components/layout/PageLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
  const [searchTerm, setSearchTerm] = useState("");
  const [activeFilter, setActiveFilter] = useState("Active");
  const [viewMode, setViewMode] = useState<"list" | "grid">("list");
  const [expandedPlans, setExpandedPlans] = useState<Set<string>>(new Set(["plan1", "plan2"]));
  const [companySearchTerm, setCompanySearchTerm] = useState("");
  const [fundSearchTerm, setFundSearchTerm] = useState("");
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
  
  // Add Plan workflow states
  const [isSelectPlanTypeOpen, setIsSelectPlanTypeOpen] = useState(false);
  const [selectedPlanType, setSelectedPlanType] = useState("");
  const [planSetupStep, setPlanSetupStep] = useState(1);
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
      line1: "230 Meadowbrook Dr. Unit 4",
      line2: "ANCASTER ON L9K 1J3",
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
        type: "RRSP",
        shortType: "RRSP",
        account: "RRSP-984512",
        category: "Individual Plan",
        holder: "Smith, John",
        risk: "Medium",
        objective: "Growth",
        marketValue: "$82,905.00",
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
        {/* Primary Navigation Tabs */}
        <div className="flex items-center gap-2 border-b border-gray-200 pb-2">
          <Button
            variant="default"
            className="bg-blue-600 text-white hover:bg-blue-700"
            onClick={() => navigate("/clients")}
          >
            <User className="h-4 w-4 mr-2" />
            All Clients
          </Button>
          <Button
            variant="ghost"
            className="text-gray-700 hover:bg-gray-100"
            onClick={() => navigate("/households")}
          >
            Households
          </Button>
          <Button
            variant="ghost"
            className="text-gray-700 hover:bg-gray-100"
            onClick={() => navigate("/income-plans")}
          >
            Income Plans
          </Button>
          <Button
            variant="ghost"
            className="text-gray-700 hover:bg-gray-100"
            onClick={() => navigate("/approvals")}
          >
            Approvals
          </Button>
          <Button
            variant="ghost"
            className="text-gray-700 hover:bg-gray-100"
            onClick={() => navigate("/reports")}
          >
            Reports
          </Button>
          <Button
            variant="ghost"
            className="text-gray-700 hover:bg-gray-100"
            onClick={() => navigate("/advanced-search")}
          >
            <Search className="h-4 w-4 mr-2" />
            Advanced Search
          </Button>
        </div>

        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search clients by name, email, ID, or location..."
            className="pl-10 bg-gray-50 border-gray-200 rounded-lg"
          />
        </div>

        {/* Filter Options and View Toggles */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <Checkbox
                id="active-filter"
                checked={activeFilter === "Active"}
                onCheckedChange={() => setActiveFilter("Active")}
                className="h-4 w-4"
              />
              <label htmlFor="active-filter" className="text-sm text-gray-700 cursor-pointer flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-green-600" />
                Active ({activeCount})
              </label>
            </div>
            <div className="flex items-center gap-2">
              <Checkbox
                id="inactive-filter"
                checked={activeFilter === "Inactive"}
                onCheckedChange={() => setActiveFilter("Inactive")}
                className="h-4 w-4"
              />
              <label htmlFor="inactive-filter" className="text-sm text-gray-700 cursor-pointer flex items-center gap-2">
                <Minus className="h-4 w-4 text-gray-600" />
                Inactive ({inactiveCount})
              </label>
            </div>
            <div className="flex items-center gap-2">
              <Checkbox
                id="prospects-filter"
                checked={activeFilter === "Prospects"}
                onCheckedChange={() => setActiveFilter("Prospects")}
                className="h-4 w-4"
              />
              <label htmlFor="prospects-filter" className="text-sm text-gray-700 cursor-pointer flex items-center gap-2">
                <Clock className="h-4 w-4 text-gray-600" />
                Prospects ({prospectsCount})
              </label>
            </div>
          </div>

          {/* View Toggles */}
          <div className="flex items-center gap-2 border border-gray-200 rounded-lg p-1">
            <Button
              variant={viewMode === "list" ? "default" : "ghost"}
              size="sm"
              className={`h-8 w-8 p-0 ${
                viewMode === "list" ? "bg-gray-100 text-gray-900" : "text-gray-600"
              }`}
              onClick={() => setViewMode("list")}
            >
              <List className="h-4 w-4" />
            </Button>
            <Button
              variant={viewMode === "grid" ? "default" : "ghost"}
              size="sm"
              className={`h-8 w-8 p-0 ${
                viewMode === "grid" ? "bg-gray-100 text-gray-900" : "text-gray-600"
              }`}
              onClick={() => setViewMode("grid")}
            >
              <Grid3x3 className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Client Summary Card */}
        <Card className="bg-white border border-gray-200 shadow-sm rounded-lg">
          <CardContent className="p-6">
            <div className="flex items-center justify-between gap-8">
              {/* Client ID Section */}
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <User className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-1">Client ID</p>
                  <p className="text-sm font-bold text-gray-900">
                    {client.id} - {client.name}
                  </p>
                </div>
              </div>

              {/* Total Assets Section */}
              <div className="flex items-center gap-3">
                <div className="p-2 bg-green-100 rounded-lg">
                  <DollarSign className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-1">Total Assets</p>
                  <p className="text-sm font-bold text-green-600">{clientDetails.totalAssets}</p>
                </div>
              </div>

              {/* Total Trades Section */}
              <div className="flex items-center gap-3">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <BarChart3 className="h-5 w-5 text-purple-600" />
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-1">Total Trades</p>
                  <p className="text-sm font-bold text-gray-900">{clientDetails.totalTrades}</p>
                </div>
              </div>

              {/* Join Date Section */}
              <div className="flex items-center gap-3">
                <div className="p-2 bg-orange-100 rounded-lg">
                  <Calendar className="h-5 w-5 text-orange-600" />
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-1">Join Date</p>
                  <p className="text-sm font-bold text-gray-900">{clientDetails.joinDate}</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Information Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Mailing Address Card */}
          <Card className="border border-gray-200 shadow-sm">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-semibold text-gray-900 flex items-center gap-2">
                <MapPin className="h-4 w-4 text-gray-600" />
                Mailing Address
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <p className="text-sm text-gray-700">{clientDetails.mailingAddress.line1}</p>
              <p className="text-sm text-gray-700">{clientDetails.mailingAddress.line2}</p>
            </CardContent>
          </Card>

          {/* Contact Information Card */}
          <Card className="border border-gray-200 shadow-sm">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-semibold text-gray-900 flex items-center gap-2">
                <Phone className="h-4 w-4 text-gray-600" />
                Contact Information
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <p className="text-sm text-gray-700">Home: {clientDetails.contact.home}</p>
              <p className="text-sm text-gray-700">Cell: {clientDetails.contact.cell}</p>
              <p className="text-sm text-gray-700">Email: {clientDetails.contact.email}</p>
            </CardContent>
          </Card>

          {/* Representative Card */}
          <Card className="border border-gray-200 shadow-sm">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-semibold text-gray-900 flex items-center gap-2">
                <User className="h-4 w-4 text-gray-600" />
                Representative
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <p className="text-sm text-gray-700">{clientDetails.representative.name}</p>
              <p className="text-sm text-gray-700">ID: {clientDetails.representative.id}</p>
              <p className="text-sm text-gray-700">Language: {clientDetails.representative.language}</p>
            </CardContent>
          </Card>
        </div>

        {/* Financial Portfolio Section */}
        <Card className="border border-gray-200 shadow-sm">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-base font-semibold text-gray-900 flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-gray-600" />
                Financial Portfolio
              </CardTitle>
              <Button 
                size="sm" 
                className="bg-blue-600 hover:bg-blue-700 text-white"
                onClick={() => {
                  setIsSelectPlanTypeOpen(true);
                  setSelectedPlanType("");
                  setPlanSetupStep(1);
                  setOwnerName("John Smith");
                  setBeneficiaryName("");
                  setIntermediaryCode("");
                  setIntermediaryAccountCode("");
                  setPlanNotes("");
                  setPlanObjectives("");
                  setRiskTolerance("");
                  setTimeHorizon("");
                }}
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Plan
              </Button>
            </div>
          </CardHeader>
          <CardContent className="pt-0">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-4 mb-4">
                <TabsTrigger value="investments" className="text-sm">
                  Investments
                </TabsTrigger>
                <TabsTrigger value="cash" className="text-sm">
                  Cash
                </TabsTrigger>
                <TabsTrigger value="trading-activity" className="text-sm">
                  Trading Activity
                </TabsTrigger>
                <TabsTrigger value="documents" className="text-sm relative">
                  Documents
                  <span className="absolute top-0 right-0 h-2 w-2 bg-orange-500 rounded-full"></span>
                </TabsTrigger>
              </TabsList>

              <TabsContent value="investments" className="space-y-3">
                {clientDetails.plans.map((plan) => {
                  const isExpanded = expandedPlans.has(plan.id);
                  return (
                    <Card key={plan.id} className="border border-gray-200 shadow-sm">
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between gap-3">
                          <button
                            onClick={() => togglePlanExpansion(plan.id)}
                            className="flex items-center gap-3 flex-1 text-left"
                          >
                            <ChevronUp
                              className={`h-4 w-4 text-gray-400 transition-transform flex-shrink-0 ${
                                isExpanded ? "" : "rotate-180"
                              }`}
                            />
                            <div className="flex items-center gap-2 flex-wrap text-xs text-gray-600">
                              <Badge className={`${plan.badgeColor} hover:${plan.badgeColor} font-normal px-2 py-0.5 text-xs`}>
                                {plan.shortType}
                              </Badge>
                              <span>•</span>
                              <span>{plan.category}</span>
                              <span>•</span>
                              <span>Account: {plan.account}</span>
                              <span>•</span>
                              <span>{plan.holder}</span>
                              <span>•</span>
                              <span className="underline">Risk: {plan.risk}</span>
                              <span>•</span>
                              <span className="underline">Objective: {plan.objective}</span>
                            </div>
                          </button>
                          {!isExpanded && (
                            <Badge className="bg-green-100 text-green-700 hover:bg-green-100 font-normal px-2 py-0.5 text-xs flex-shrink-0">
                              Market Value: {plan.marketValue}
                            </Badge>
                          )}
                        </div>
                        {isExpanded && (
                          <div className="mt-4 pt-4 border-t border-gray-200">
                            {plan.products && plan.products.length > 0 ? (
                              <>
                            {/* Investment Table */}
                            <div className="mb-4">
                              <Table>
                                <TableHeader>
                                  <TableRow className="bg-gray-50">
                                    <TableHead className="text-xs font-semibold text-gray-700">Supplier</TableHead>
                                    <TableHead className="text-xs font-semibold text-gray-700">Account</TableHead>
                                    <TableHead className="text-xs font-semibold text-gray-700">Product</TableHead>
                                    <TableHead className="text-xs font-semibold text-gray-700">Objective</TableHead>
                                    <TableHead className="text-xs font-semibold text-gray-700">Units</TableHead>
                                    <TableHead className="text-xs font-semibold text-gray-700">Price</TableHead>
                                    <TableHead className="text-xs font-semibold text-gray-700">Net Invested</TableHead>
                                    <TableHead className="text-xs font-semibold text-gray-700">Market Value</TableHead>
                                    <TableHead className="text-xs font-semibold text-gray-700">Book Value</TableHead>
                                    <TableHead className="text-xs font-semibold text-gray-700">Trading</TableHead>
                                  </TableRow>
                                </TableHeader>
                                <TableBody>
                                  {plan.products.map((product, index) => (
                                    <TableRow key={index} className="hover:bg-gray-50">
                                      <TableCell>
                                        <div className="flex items-center gap-2">
                                          <div className="p-1 bg-blue-100 rounded text-blue-600 text-xs font-bold w-6 h-6 flex items-center justify-center">
                                            F
                                          </div>
                                          <span className="text-xs text-gray-900">{product.supplier}</span>
                                        </div>
                                      </TableCell>
                                      <TableCell className="text-xs text-gray-700">{product.account}</TableCell>
                                      <TableCell className="text-xs text-gray-900 font-medium">{product.product}</TableCell>
                                      <TableCell className="text-xs text-gray-700">{product.objective}</TableCell>
                                      <TableCell className="text-xs text-gray-700">{product.units}</TableCell>
                                      <TableCell className="text-xs text-gray-700">{product.price}</TableCell>
                                      <TableCell className="text-xs text-gray-700">{product.netInvested}</TableCell>
                                      <TableCell>
                                        <div>
                                          <p className="text-xs font-semibold text-green-600">{product.marketValue}</p>
                                          <p className={`text-[10px] ${product.marketValueChangePositive ? "text-green-600" : "text-red-600"}`}>
                                            {product.marketValueChange}
                                          </p>
                                        </div>
                                      </TableCell>
                                      <TableCell className="text-xs text-gray-700">{product.bookValue}</TableCell>
                                      <TableCell>
                                        <div className="flex items-center gap-1">
                                          <Button
                                            variant="ghost"
                                            size="sm"
                                            className="h-6 w-6 p-0"
                                            onClick={() => {
                                              setSelectedProduct(product);
                                              setSelectedPlan(plan);
                                              setInvestmentAmount("200");
                                              setNumberOfUnits("");
                                              setIsBuyUnitsDialogOpen(true);
                                            }}
                                          >
                                            <Plus className="h-3 w-3" />
                                          </Button>
                                          <Button
                                            variant="ghost"
                                            size="sm"
                                            className="h-6 w-6 p-0"
                                            onClick={() => {
                                              setSelectedProduct(product);
                                              setSelectedPlan(plan);
                                              setSellUnits("200");
                                              setSellDollarAmount("");
                                              setIsSellUnitsDialogOpen(true);
                                            }}
                                          >
                                            <Minus className="h-3 w-3" />
                                          </Button>
                                          <Button
                                            variant="ghost"
                                            size="sm"
                                            className="h-6 w-6 p-0"
                                            onClick={() => {
                                              setSelectedProduct(product);
                                              setSelectedPlan(plan);
                                              setSelectedFundCompany("");
                                              setSelectedFundToSwitch("");
                                              setUnitsToSwitch("");
                                              setCompanySearchTerm("");
                                              setFundSearchTerm("");
                                              // Determine if it's a switch (same company) or convert (different company)
                                              // For now, we'll open switch dialog by default, user can change company
                                              setIsSwitchDialogOpen(true);
                                            }}
                                          >
                                            <ArrowLeftRight className="h-3 w-3" />
                                          </Button>
                                        </div>
                                      </TableCell>
                                    </TableRow>
                                  ))}
                                  {/* Total Row */}
                                  <TableRow className="bg-gray-50 font-semibold">
                                    <TableCell>
                                      <div className="flex items-center gap-2">
                                        <div className="p-1 bg-blue-100 rounded text-blue-600 text-xs font-bold w-6 h-6 flex items-center justify-center">
                                          T
                                        </div>
                                        <span className="text-xs text-gray-900">Total</span>
                                      </div>
                                    </TableCell>
                                    <TableCell></TableCell>
                                    <TableCell></TableCell>
                                    <TableCell></TableCell>
                                    <TableCell></TableCell>
                                    <TableCell></TableCell>
                                    <TableCell className="text-xs text-gray-900">{plan.totals.netInvested}</TableCell>
                                    <TableCell className="text-xs font-semibold text-green-600">{plan.totals.totalMarketValue}</TableCell>
                                    <TableCell className="text-xs text-gray-900">{plan.totals.totalBookValue}</TableCell>
                                    <TableCell></TableCell>
                                  </TableRow>
                                </TableBody>
                              </Table>
                            </div>

                            {/* Add Product Button */}
                            <div className="flex justify-end mb-4">
                              <Button 
                                variant="outline" 
                                size="sm" 
                                className="bg-blue-50 text-blue-600 border-blue-200 hover:bg-blue-100"
                                onClick={() => {
                                  setIsStandaloneAddProductOpen(true);
                                  setStandaloneFundCompany("");
                                  setStandaloneFundSearch("");
                                  setStandaloneSelectedFund("");
                                  setStandaloneAmount("");
                                }}
                              >
                                <Plus className="h-4 w-4 mr-2" />
                                Add Product
                              </Button>
                            </div>
                              </>
                            ) : (
                              <div className="text-center py-8 text-gray-500">
                                <p className="text-sm">No products in this plan.</p>
                                <Button 
                                  variant="outline" 
                                  size="sm" 
                                  className="mt-4 bg-blue-50 text-blue-600 border-blue-200 hover:bg-blue-100"
                                  onClick={() => {
                                    setIsStandaloneAddProductOpen(true);
                                    setStandaloneFundCompany("");
                                    setStandaloneFundSearch("");
                                    setStandaloneSelectedFund("");
                                    setStandaloneAmount("");
                                  }}
                                >
                                  <Plus className="h-4 w-4 mr-2" />
                                  Add Product
                                </Button>
                              </div>
                            )}

                            {/* Trust Account Cards - Always show */}
                            <div className="grid grid-cols-3 gap-3 mb-4 mt-4">
                              <Card className="border border-gray-200 shadow-sm">
                                <CardContent className="p-3">
                                  <p className="text-xs text-gray-500 mb-1">Trust Account CAD</p>
                                  <p className="text-sm font-bold text-gray-900 mb-2">$0.00</p>
                                  <div className="space-y-0.5">
                                    <div className="flex justify-between text-xs">
                                      <span className="text-gray-500">Settled:</span>
                                      <span className="text-green-600 font-medium">$0.00</span>
                                    </div>
                                    <div className="flex justify-between text-xs">
                                      <span className="text-gray-500">Unsettled:</span>
                                      <span className="text-orange-600 font-medium">$0.00</span>
                                    </div>
                                  </div>
                                </CardContent>
                              </Card>

                              <Card className="border border-gray-200 shadow-sm">
                                <CardContent className="p-3">
                                  <p className="text-xs text-gray-500 mb-1">Trust Account USD</p>
                                  <p className="text-sm font-bold text-gray-900 mb-2">$0.00</p>
                                  <div className="space-y-0.5">
                                    <div className="flex justify-between text-xs">
                                      <span className="text-gray-500">Settled:</span>
                                      <span className="text-green-600 font-medium">$0.00</span>
                                    </div>
                                    <div className="flex justify-between text-xs">
                                      <span className="text-gray-500">Unsettled:</span>
                                      <span className="text-orange-600 font-medium">$0.00</span>
                                    </div>
                                  </div>
                                </CardContent>
                              </Card>

                              <Card className="border border-gray-200 shadow-sm">
                                <CardContent className="p-3">
                                  <p className="text-xs text-gray-500 mb-1">Total in CAD</p>
                                  <p className="text-sm font-bold text-green-600">{plan.marketValue}</p>
                                </CardContent>
                              </Card>
                            </div>

                            {/* Deposit Button - Always show */}
                            <div className="flex justify-center">
                              <Button
                                className="bg-blue-600 hover:bg-blue-700 text-white"
                                onClick={() => setIsDepositDialogOpen(true)}
                              >
                                <Plus className="h-4 w-4 mr-2" />
                                Deposit
                              </Button>
                            </div>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  );
                })}
              </TabsContent>

              <TabsContent value="cash">
                <div className="space-y-6">
                  {/* Cash Balances Section */}
                  <div>
                    <h3 className="text-sm font-semibold text-gray-900 mb-3">Cash Balances</h3>
                    <div className="grid grid-cols-2 gap-4">
                      {/* Canadian Dollars (CAD) Card */}
                      <Card className="border border-gray-200 shadow-sm bg-red-50">
                        <CardContent className="p-4">
                          <div className="flex items-center gap-2 mb-4">
                            <DollarSign className="h-4 w-4 text-red-600" />
                            <h4 className="text-sm font-semibold text-gray-900">Canadian Dollars (CAD)</h4>
                          </div>
                          <div className="space-y-2">
                            <div className="flex justify-between items-center">
                              <span className="text-xs text-gray-700">Cash Available CAD</span>
                              <span className="text-xs font-medium text-gray-900">$0.00</span>
                            </div>
                            <div className="flex justify-between items-center">
                              <span className="text-xs text-gray-700">Cash Used For Trades CAD</span>
                              <span className="text-xs font-medium text-gray-900">$0.00</span>
                            </div>
                            <div className="flex justify-between items-center pt-2 border-t border-red-200">
                              <span className="text-xs font-semibold text-red-600">Cash Total CAD</span>
                              <span className="text-xs font-semibold text-red-600">$0.00</span>
                            </div>
                          </div>
                        </CardContent>
                      </Card>

                      {/* United States Dollars (USD) Card */}
                      <Card className="border border-gray-200 shadow-sm bg-green-50">
                        <CardContent className="p-4">
                          <div className="flex items-center gap-2 mb-4">
                            <DollarSign className="h-4 w-4 text-green-600" />
                            <h4 className="text-sm font-semibold text-gray-900">United States Dollars (USD)</h4>
                          </div>
                          <div className="space-y-2">
                            <div className="flex justify-between items-center">
                              <span className="text-xs text-gray-700">Cash Available USD</span>
                              <span className="text-xs font-medium text-gray-900">$0.00</span>
                            </div>
                            <div className="flex justify-between items-center">
                              <span className="text-xs text-gray-700">Cash Used For Trades USD</span>
                              <span className="text-xs font-medium text-gray-900">$0.00</span>
                            </div>
                            <div className="flex justify-between items-center pt-2 border-t border-green-200">
                              <span className="text-xs font-semibold text-green-600">Cash Total USD</span>
                              <span className="text-xs font-semibold text-green-600">$0.00</span>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </div>

                  {/* Recent Cash Transactions Section */}
                  <div>
                    <h3 className="text-sm font-semibold text-gray-900 mb-3">Recent Cash Transactions</h3>
                    <Card className="border border-gray-200 shadow-sm">
                      <CardContent className="p-4">
                        <div className="space-y-4">
                          {/* Cash Deposit Transaction */}
                          <div className="flex items-start justify-between">
                            <div className="flex items-start gap-3">
                              <div className="p-1.5 bg-green-100 rounded-full">
                                <Plus className="h-4 w-4 text-green-600" />
                              </div>
                              <div>
                                <p className="text-sm font-medium text-gray-900">Cash Deposit</p>
                                <p className="text-xs text-gray-500 mt-0.5">2 days ago</p>
                              </div>
                            </div>
                            <span className="text-sm font-semibold text-green-600">+$1,250.00 CAD</span>
                          </div>

                          {/* Currency Exchange Transaction */}
                          <div className="flex items-start justify-between">
                            <div className="flex items-start gap-3">
                              <div className="p-1.5 bg-blue-100 rounded-full">
                                <ArrowLeftRight className="h-4 w-4 text-blue-600" />
                              </div>
                              <div>
                                <p className="text-sm font-medium text-gray-900">Currency Exchange</p>
                                <p className="text-xs text-gray-500 mt-0.5">1 week ago</p>
                              </div>
                            </div>
                            <span className="text-sm font-semibold text-blue-600">$500.00 USD</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="trading-activity">
                <div className="space-y-6">
                  {/* Trading Summary Section */}
                  <div>
                    <h3 className="text-sm font-semibold text-gray-900 mb-3">Trading Summary</h3>
                    <div className="grid grid-cols-4 gap-4">
                      <Card className="border border-gray-200 shadow-sm">
                        <CardContent className="p-4">
                          <p className="text-xs text-gray-500 mb-1">Total Trades</p>
                          <p className="text-2xl font-bold text-blue-600">45</p>
                        </CardContent>
                      </Card>
                      <Card className="border border-gray-200 shadow-sm">
                        <CardContent className="p-4">
                          <p className="text-xs text-gray-500 mb-1">Buy Orders</p>
                          <p className="text-2xl font-bold text-green-600">8</p>
                        </CardContent>
                      </Card>
                      <Card className="border border-gray-200 shadow-sm">
                        <CardContent className="p-4">
                          <p className="text-xs text-gray-500 mb-1">Sell Orders</p>
                          <p className="text-2xl font-bold text-red-600">4</p>
                        </CardContent>
                      </Card>
                      <Card className="border border-gray-200 shadow-sm">
                        <CardContent className="p-4">
                          <p className="text-xs text-gray-500 mb-1">Pending</p>
                          <p className="text-2xl font-bold text-purple-600">2</p>
                        </CardContent>
                      </Card>
                    </div>
                  </div>

                  {/* Recent Trading Activity Section */}
                  <div>
                    <h3 className="text-sm font-semibold text-gray-900 mb-3">Recent Trading Activity</h3>
                    <Card className="border border-gray-200 shadow-sm">
                      <CardContent className="p-0">
                        <Table>
                          <TableHeader>
                            <TableRow className="bg-gray-50">
                              <TableHead className="text-xs font-semibold text-gray-700">Date</TableHead>
                              <TableHead className="text-xs font-semibold text-gray-700">Type</TableHead>
                              <TableHead className="text-xs font-semibold text-gray-700">Security</TableHead>
                              <TableHead className="text-xs font-semibold text-gray-700">Quantity</TableHead>
                              <TableHead className="text-xs font-semibold text-gray-700">Price</TableHead>
                              <TableHead className="text-xs font-semibold text-gray-700">Status</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            <TableRow className="hover:bg-gray-50">
                              <TableCell className="text-xs text-gray-900">02/12/2025</TableCell>
                              <TableCell>
                                <Badge className="bg-green-100 text-green-700 hover:bg-green-100 font-normal px-2 py-0.5 text-xs">
                                  Buy
                                </Badge>
                              </TableCell>
                              <TableCell className="text-xs text-gray-900">FIDELITY NORTHSTAR FUND Series B ISC</TableCell>
                              <TableCell className="text-xs text-gray-700">100</TableCell>
                              <TableCell className="text-xs text-gray-700">$117.35</TableCell>
                              <TableCell>
                                <Badge className="bg-green-100 text-green-700 hover:bg-green-100 font-normal px-2 py-0.5 text-xs">
                                  Executed
                                </Badge>
                              </TableCell>
                            </TableRow>
                            <TableRow className="hover:bg-gray-50">
                              <TableCell className="text-xs text-gray-900">02/10/2025</TableCell>
                              <TableCell>
                                <Badge className="bg-red-100 text-red-700 hover:bg-red-100 font-normal px-2 py-0.5 text-xs">
                                  Sell
                                </Badge>
                              </TableCell>
                              <TableCell className="text-xs text-gray-900">FIDELITY MONTHLY INCOME FUND Series B ISC</TableCell>
                              <TableCell className="text-xs text-gray-700">50</TableCell>
                              <TableCell className="text-xs text-gray-700">$605.31</TableCell>
                              <TableCell>
                                <Badge className="bg-green-100 text-green-700 hover:bg-green-100 font-normal px-2 py-0.5 text-xs">
                                  Executed
                                </Badge>
                              </TableCell>
                            </TableRow>
                            <TableRow className="hover:bg-gray-50">
                              <TableCell className="text-xs text-gray-900">02/08/2025</TableCell>
                              <TableCell>
                                <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-100 font-normal px-2 py-0.5 text-xs">
                                  Buy
                                </Badge>
                              </TableCell>
                              <TableCell className="text-xs text-gray-900">TD CANADIAN EQUITY FUND Series A</TableCell>
                              <TableCell className="text-xs text-gray-700">75</TableCell>
                              <TableCell className="text-xs text-gray-700">$339.34</TableCell>
                              <TableCell>
                                <Badge className="bg-yellow-100 text-yellow-700 hover:bg-yellow-100 font-normal px-2 py-0.5 text-xs">
                                  Pending
                                </Badge>
                              </TableCell>
                            </TableRow>
                          </TableBody>
                        </Table>
                      </CardContent>
                    </Card>
                  </div>
                </div>
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
      <Dialog open={planSetupStep === 1 && !isSelectPlanTypeOpen} onOpenChange={(open) => {
        if (!open) {
          setPlanSetupStep(0);
          setIsSelectPlanTypeOpen(false);
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
      <Dialog open={planSetupStep === 2} onOpenChange={(open) => {
        if (!open) {
          setPlanSetupStep(0);
          setIsSelectPlanTypeOpen(false);
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
      <Dialog open={planSetupStep === 3} onOpenChange={(open) => {
        if (!open) {
          setPlanSetupStep(0);
          setIsSelectPlanTypeOpen(false);
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
