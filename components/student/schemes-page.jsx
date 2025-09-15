"use client";

import React, { useState, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  GraduationCap,
  BookOpen,
  Users,
  Award,
  Target,
  TrendingUp,
  Clock,
  Star,
  Search,
  Filter,
  ChevronRight,
  Calendar,
  MapPin,
  Phone,
  Mail,
  ExternalLink,
  CheckCircle,
  AlertCircle,
  Info,
  Gift,
  Banknote,
  FileText,
  UserCheck,
  Building,
  Globe,
  Smartphone,
  Home,
  Briefcase,
  Heart,
  Lightbulb,
  Zap,
  Trophy,
  Shield,
} from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

// Comprehensive schemes data
const schemesData = [
  {
    id: "pm-scholarship",
    name: "PM Scholarship Scheme",
    description: "Financial assistance for meritorious students from various backgrounds to pursue higher education",
    category: "Education",
    icon: GraduationCap,
    color: "bg-blue-50 border-blue-200 text-blue-600 dark:bg-blue-950/20 dark:text-blue-400",
    amount: "₹2,500/month",
    eligibility: "Class 12 passed with 85%+ marks",
    deadline: "2025-12-31",
    applicationStatus: "Open",
    priority: "High",
    beneficiaries: "50,000+",
    details: {
      fullName: "Prime Minister's Scholarship Scheme for Central Armed Police Forces and Assam Rifles",
      objective: "To provide financial assistance to meritorious students who are children/widows of CAPF and AR personnel",
      benefits: [
        "Monthly scholarship of ₹2,500 for boys",
        "Monthly scholarship of ₹3,000 for girls", 
        "Covers tuition fees up to ₹30,000/year",
        "Additional book allowance of ₹2,000/year"
      ],
      eligibility: [
        "Minimum 60% marks in Class 12",
        "Annual family income below ₹6 lakh",
        "Child/widow of CAPF/AR personnel",
        "Enrolled in recognized institution"
      ],
      documents: [
        "Class 12 marksheet",
        "Income certificate", 
        "Service certificate of parent",
        "Bank account details",
        "Institution enrollment letter"
      ],
      applicationProcess: [
        "Visit National Scholarship Portal",
        "Register with valid credentials",
        "Fill application form completely",
        "Upload required documents",
        "Submit and take printout"
      ]
    },
    tags: ["Education", "Scholarship", "Students", "CAPF"],
    website: "https://scholarships.gov.in/",
    helpline: "0120-6619540"
  },
  {
    id: "skill-development",
    name: "Skill India Mission",
    description: "Comprehensive skill development program to enhance employability of Indian youth",
    category: "Skill Development", 
    icon: Briefcase,
    color: "bg-green-50 border-green-200 text-green-600 dark:bg-green-950/20 dark:text-green-400",
    amount: "Free Training + ₹500/day stipend",
    eligibility: "Age 18-45 years",
    deadline: "Ongoing",
    applicationStatus: "Open",
    priority: "High",
    beneficiaries: "1 Crore+",
    details: {
      fullName: "Skill India Mission - Pradhan Mantri Kaushal Vikas Yojana",
      objective: "To provide industry-relevant skill training to enable youth to get better livelihood opportunities",
      benefits: [
        "Free skill training programs",
        "Stipend during training period",
        "Certification upon completion", 
        "Job placement assistance",
        "Tool kit for selected trades"
      ],
      eligibility: [
        "Age between 18-45 years",
        "Indian citizen",
        "School dropout or unemployed",
        "Basic literacy preferred"
      ],
      documents: [
        "Aadhaar card",
        "Bank account passbook",
        "Educational certificates",
        "Passport size photographs"
      ],
      applicationProcess: [
        "Visit nearest Skill Development Center",
        "Choose training program",
        "Complete enrollment process",
        "Attend training sessions",
        "Appear for assessment"
      ]
    },
    tags: ["Skills", "Employment", "Training", "Youth"],
    website: "https://www.skillindia.gov.in/",
    helpline: "08800-055555"
  },
  {
    id: "digital-india",
    name: "Digital India Initiative",
    description: "Transforming India into digitally empowered society through digital literacy and infrastructure",
    category: "Technology",
    icon: Smartphone,
    color: "bg-purple-50 border-purple-200 text-purple-600 dark:bg-purple-950/20 dark:text-purple-400",
    amount: "Free Digital Services",
    eligibility: "All Indian Citizens",
    deadline: "Ongoing",
    applicationStatus: "Open", 
    priority: "Medium",
    beneficiaries: "130 Crore+",
    details: {
      fullName: "Digital India - Technology for Transformation",
      objective: "To transform India into a digitally empowered society and knowledge economy",
      benefits: [
        "Free digital literacy programs",
        "Online government services",
        "Digital payment platforms",
        "Free WiFi in public places",
        "Digital health records"
      ],
      eligibility: [
        "Indian citizen",
        "Valid Aadhaar card",
        "Basic mobile/computer access"
      ],
      documents: [
        "Aadhaar card",
        "Mobile number", 
        "Email ID"
      ],
      applicationProcess: [
        "Visit DigiLocker portal",
        "Register with Aadhaar",
        "Access various digital services",
        "Download mobile apps",
        "Complete digital literacy course"
      ]
    },
    tags: ["Technology", "Digital", "Services", "Literacy"],
    website: "https://digitalindia.gov.in/",
    helpline: "1800-3000-3468"
  },
  {
    id: "jan-aushadhi",
    name: "Pradhan Mantri Jan Aushadhi",
    description: "Affordable generic medicines for all through dedicated pharmacy stores across India",
    category: "Healthcare",
    icon: Heart,
    color: "bg-red-50 border-red-200 text-red-600 dark:bg-red-950/20 dark:text-red-400", 
    amount: "Up to 90% discount on medicines",
    eligibility: "All Citizens",
    deadline: "Ongoing",
    applicationStatus: "Open",
    priority: "High",
    beneficiaries: "50 Crore+",
    details: {
      fullName: "Pradhan Mantri Bharatiya Janaushadhi Pariyojana",
      objective: "To provide quality generic medicines at affordable prices to all citizens of India",
      benefits: [
        "Generic medicines at 50-90% lower prices",
        "Quality assured medications",
        "Wide network of Jan Aushadhi stores",
        "Surgical items and medical devices",
        "Free health checkup camps"
      ],
      eligibility: [
        "All Indian citizens",
        "No income criteria",
        "Valid prescription for medicines"
      ],
      documents: [
        "Doctor's prescription",
        "Identity proof",
        "Medical reports (if any)"
      ],
      applicationProcess: [
        "Locate nearest Jan Aushadhi store",
        "Present valid prescription", 
        "Purchase medicines at discounted rates",
        "Participate in health camps",
        "Get free basic health checkup"
      ]
    },
    tags: ["Healthcare", "Medicine", "Affordable", "Generic"],
    website: "https://janaushadhi.gov.in/",
    helpline: "1800-3000-2177"
  },
  {
    id: "housing-scheme",
    name: "PM Awas Yojana",
    description: "Housing for All mission providing affordable housing solutions for urban and rural poor",
    category: "Housing",
    icon: Home,
    color: "bg-orange-50 border-orange-200 text-orange-600 dark:bg-orange-950/20 dark:text-orange-400",
    amount: "₹2.5 Lakh subsidy",
    eligibility: "EWS/LIG families",
    deadline: "2025-03-31",
    applicationStatus: "Open",
    priority: "High", 
    beneficiaries: "1.2 Crore+",
    details: {
      fullName: "Pradhan Mantri Awas Yojana - Housing for All",
      objective: "To provide pucca houses to all houseless and those living in inadequate houses",
      benefits: [
        "Interest subsidy on home loans",
        "Direct financial assistance",
        "Infrastructure development", 
        "In-situ slum redevelopment",
        "Partnership with private sector"
      ],
      eligibility: [
        "Economically Weaker Section (EWS)",
        "Lower Income Group (LIG)",
        "Middle Income Group (MIG)",
        "No pucca house in name",
        "Not availed central assistance before"
      ],
      documents: [
        "Income certificate",
        "Aadhaar card",
        "Bank account details",
        "Property documents",
        "Photograph"
      ],
      applicationProcess: [
        "Apply online on official portal",
        "Fill application form",
        "Upload documents",
        "Wait for verification",
        "Receive approval and subsidy"
      ]
    },
    tags: ["Housing", "Subsidy", "Urban", "Rural"],
    website: "https://pmaymis.gov.in/",
    helpline: "1800-11-6163"
  },
  {
    id: "startup-india",
    name: "Startup India Scheme",
    description: "Initiative to promote entrepreneurship and support innovative startups across various sectors",
    category: "Business",
    icon: Lightbulb,
    color: "bg-indigo-50 border-indigo-200 text-indigo-600 dark:bg-indigo-950/20 dark:text-indigo-400",
    amount: "₹10 Lakh funding + Tax benefits",
    eligibility: "Innovative business ideas",
    deadline: "Ongoing",
    applicationStatus: "Open",
    priority: "Medium",
    beneficiaries: "75,000+",
    details: {
      fullName: "Startup India - Stand up India Initiative", 
      objective: "To promote entrepreneurship by providing a platform for startups and create a robust startup ecosystem",
      benefits: [
        "Fast-track patent examination",
        "Tax exemptions for 3 years",
        "Easy compliance procedures",
        "Funding support and incubation",
        "Networking opportunities"
      ],
      eligibility: [
        "Entity incorporated as company/LLP",
        "Up to 10 years from incorporation",
        "Annual turnover < ₹100 crore",
        "Working towards innovation",
        "Not formed by splitting existing business"
      ],
      documents: [
        "Certificate of incorporation", 
        "Business plan",
        "Pitch deck",
        "Financial projections",
        "Team details"
      ],
      applicationProcess: [
        "Register on Startup India portal",
        "Apply for recognition",
        "Submit required documents", 
        "Get DPIIT recognition",
        "Access various benefits"
      ]
    },
    tags: ["Startup", "Business", "Innovation", "Funding"],
    website: "https://www.startupindia.gov.in/",
    helpline: "1800-115-565"
  },
];

const categories = ["All", "Education", "Healthcare", "Business", "Technology", "Housing", "Skill Development"];
const priorities = ["All", "High", "Medium", "Low"];
const statuses = ["All", "Open", "Closed", "Coming Soon"];

const SchemesPage = () => {
  const [selectedScheme, setSelectedScheme] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [priorityFilter, setPriorityFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");

  const filteredSchemes = schemesData.filter((scheme) => {
    const matchesSearch = 
      scheme.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      scheme.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      scheme.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesCategory = categoryFilter === "All" || scheme.category === categoryFilter;
    const matchesPriority = priorityFilter === "All" || scheme.priority === priorityFilter;
    const matchesStatus = statusFilter === "All" || scheme.applicationStatus === statusFilter;

    return matchesSearch && matchesCategory && matchesPriority && matchesStatus;
  });

  const getPriorityColor = (priority) => {
    switch(priority) {
      case "High": return "text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-950/20 border-red-200";
      case "Medium": return "text-yellow-600 dark:text-yellow-400 bg-yellow-50 dark:bg-yellow-950/20 border-yellow-200";
      default: return "text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-950/20 border-green-200";
    }
  };

  const getStatusColor = (status) => {
    switch(status) {
      case "Open": return "text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-950/20 border-green-200";
      case "Closed": return "text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-950/20 border-red-200";
      default: return "text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/20 border-blue-200";
    }
  };

  return (
    <div className="space-y-4 ">
      <div className="space-y-4 sm:space-y-6">
        {/* Page Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-2"
        >
          <div className="flex items-center space-x-3">
            <div>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight">
                Government Schemes
              </h1>
              <p className="text-sm sm:text-base text-muted-foreground mt-2">
                Discover and apply for various government schemes designed for student welfare and development
              </p>
            </div>
          </div>
        </motion.div>

        {/* Stats Cards */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="grid gap-4 sm:gap-6 grid-cols-2 lg:grid-cols-4"
        >
          <Card className="bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-950/20 dark:to-cyan-950/20 border-blue-200 dark:border-blue-800/50 h-24 justify-center">
            <CardContent className="p-4 sm:p-6">
              <div className="flex items-center space-x-3">
                <div className="bg-blue-100 dark:bg-blue-900/50 p-2 sm:p-3 rounded-xl">
                  <Trophy className="h-5 w-5 sm:h-6 sm:w-6 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <p className="text-lg sm:text-xl lg:text-2xl font-bold text-blue-800 dark:text-blue-200">
                    {schemesData.length}
                  </p>
                  <p className="text-xs sm:text-sm text-blue-700 dark:text-blue-300 font-medium">
                    Active Schemes
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20 border-green-200 dark:border-green-800/50  h-24 justify-center">
            <CardContent className="p-4 sm:p-6">
              <div className="flex items-center space-x-3">
                <div className="bg-green-100 dark:bg-green-900/50 p-2 sm:p-3 rounded-xl">
                  <Users className="h-5 w-5 sm:h-6 sm:w-6 text-green-600 dark:text-green-400" />
                </div>
                <div>
                  <p className="text-lg sm:text-xl lg:text-2xl font-bold text-green-800 dark:text-green-200">
                    15L+
                  </p>
                  <p className="text-xs sm:text-sm text-green-700 dark:text-green-300 font-medium">
                    Beneficiaries
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-orange-50 to-amber-50 dark:from-orange-950/20 dark:to-amber-950/20 border-orange-200 dark:border-orange-800/50  h-24 justify-center">
            <CardContent className="p-4 sm:p-6">
              <div className="flex items-center space-x-3">
                <div className="bg-orange-100 dark:bg-orange-900/50 p-2 sm:p-3 rounded-xl">
                  <Banknote className="h-5 w-5 sm:h-6 sm:w-6 text-orange-600 dark:text-orange-400" />
                </div>
                <div>
                  <p className="text-lg sm:text-xl lg:text-2xl font-bold text-orange-800 dark:text-orange-200">
                    ₹500Cr+
                  </p>
                  <p className="text-xs sm:text-sm text-orange-700 dark:text-orange-300 font-medium">
                    Disbursed
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-950/20 dark:to-pink-950/20 border-purple-200 dark:border-purple-800/50  h-24 justify-center">
            <CardContent className="p-4 sm:p-6">
              <div className="flex items-center space-x-3">
                <div className="bg-purple-100 dark:bg-purple-900/50 p-2 sm:p-3 rounded-xl">
                  <CheckCircle className="h-5 w-5 sm:h-6 sm:w-6 text-purple-600 dark:text-purple-400" />
                </div>
                <div>
                  <p className="text-lg sm:text-xl lg:text-2xl font-bold text-purple-800 dark:text-purple-200">
                    95%
                  </p>
                  <p className="text-xs sm:text-sm text-purple-700 dark:text-purple-300 font-medium">
                    Success Rate
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Search and Filters */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-col gap-4 sm:gap-6 lg:flex-row lg:items-center lg:justify-between"
        >
          <div className="flex-1 max-w-md relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search schemes..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-3 sm:space-y-0 sm:space-x-3">
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-full sm:w-40">
                <Filter className="mr-2 h-4 w-4" />
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>{category}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={priorityFilter} onValueChange={setPriorityFilter}>
              <SelectTrigger className="w-full sm:w-32">
                <SelectValue placeholder="Priority" />
              </SelectTrigger>
              <SelectContent>
                {priorities.map((priority) => (
                  <SelectItem key={priority} value={priority}>{priority}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full sm:w-32">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                {statuses.map((status) => (
                  <SelectItem key={status} value={status}>{status}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </motion.div>

        {/* Schemes Grid */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="grid gap-4 sm:gap-6 md:grid-cols-2 xl:grid-cols-3"
        >
          {filteredSchemes.map((scheme, index) => {
            const IconComponent = scheme.icon;
            return (
              <motion.div
                key={scheme.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ scale: 1.02 }}
              >
                <Card
                  className="border-0 shadow-lg bg-white/60 dark:bg-gray-900/60 backdrop-blur-sm hover:shadow-xl transition-all duration-300 cursor-pointer group h-full"
                  onClick={() => setSelectedScheme(scheme)}
                >
                  <CardHeader className="pb-3 sm:pb-4">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-3 min-w-0 flex-1">
                        <div className={`p-2 sm:p-3 rounded-xl ${scheme.color} group-hover:scale-110 transition-transform flex-shrink-0`}>
                          <IconComponent className="h-5 w-5 sm:h-6 sm:w-6" />
                        </div>
                        <div className="space-y-1 sm:space-y-2 min-w-0 flex-1">
                          <h3 className="font-semibold text-base sm:text-lg group-hover:text-main transition-colors line-clamp-2">
                            {scheme.name}
                          </h3>
                          <div className="flex flex-wrap gap-1 sm:gap-2">
                            <Badge variant="outline" className={`text-xs ${getPriorityColor(scheme.priority)}`}>
                              {scheme.priority} Priority
                            </Badge>
                            <Badge className={`text-xs ${getStatusColor(scheme.applicationStatus)}`}>
                              {scheme.applicationStatus}
                            </Badge>
                          </div>
                        </div>
                      </div>
                      <ChevronRight className="h-4 w-4 sm:h-5 sm:w-5 text-muted-foreground group-hover:text-main group-hover:translate-x-1 transition-all flex-shrink-0" />
                    </div>
                  </CardHeader>
                  
                  <CardContent className="space-y-3 sm:space-y-4">
                    <p className="text-xs sm:text-sm text-muted-foreground line-clamp-2">
                      {scheme.description}
                    </p>

                    <div className="grid grid-cols-2 gap-3">
                      <div className="space-y-1">
                        <p className="text-xs font-medium text-muted-foreground">Amount</p>
                        <p className="text-sm font-semibold text-green-600 dark:text-green-400">
                          {scheme.amount}
                        </p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-xs font-medium text-muted-foreground">Category</p>
                        <Badge variant="secondary" className="text-xs w-fit">
                          {scheme.category}
                        </Badge>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center space-x-2 text-xs sm:text-sm text-muted-foreground">
                        <Users className="h-3 w-3 sm:h-4 sm:w-4" />
                        <span>{scheme.beneficiaries} beneficiaries</span>
                      </div>
                      
                      {scheme.deadline !== "Ongoing" && (
                        <div className="flex items-center space-x-2 text-xs sm:text-sm text-muted-foreground">
                          <Calendar className="h-3 w-3 sm:h-4 sm:w-4" />
                          <span>Deadline: {new Date(scheme.deadline).toLocaleDateString()}</span>
                        </div>
                      )}
                    </div>

                    <div className="flex flex-wrap gap-1">
                      {scheme.tags.slice(0, 3).map((tag) => (
                        <Badge key={tag} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                      {scheme.tags.length > 3 && (
                        <Badge variant="outline" className="text-xs">
                          +{scheme.tags.length - 3} more
                        </Badge>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Empty State */}
        {filteredSchemes.length === 0 && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <div className="bg-muted/20 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <Search className="h-8 w-8 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-semibold mb-2">No schemes found</h3>
            <p className="text-muted-foreground">Try adjusting your search criteria</p>
          </motion.div>
        )}

        {/* Scheme Details Dialog */}
        <Dialog open={!!selectedScheme} onOpenChange={() => setSelectedScheme(null)}>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto border-0 shadow-2xl bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm">
            {selectedScheme && (
              <>
                <DialogHeader className="pb-4 sm:pb-6">
                  <div className="flex flex-col sm:flex-row sm:items-start space-y-3 sm:space-y-0 sm:space-x-4">
                    <div className={`p-2 sm:p-3 rounded-xl ${selectedScheme.color} flex-shrink-0`}>
                      <selectedScheme.icon className="h-6 w-6 sm:h-8 sm:w-8" />
                    </div>
                    <div className="space-y-1 sm:space-y-2 min-w-0 flex-1">
                      <DialogTitle className="text-xl sm:text-2xl">
                        {selectedScheme.name}
                      </DialogTitle>
                      <DialogDescription className="text-sm sm:text-base">
                        {selectedScheme.details.fullName}
                      </DialogDescription>
                      <div className="flex flex-wrap gap-2">
                        <Badge className={`text-xs ${getPriorityColor(selectedScheme.priority)}`}>
                          {selectedScheme.priority} Priority
                        </Badge>
                        <Badge className={`text-xs ${getStatusColor(selectedScheme.applicationStatus)}`}>
                          {selectedScheme.applicationStatus}
                        </Badge>
                        <Badge variant="outline" className="text-xs">
                          {selectedScheme.category}
                        </Badge>
                      </div>
                    </div>
                  </div>
                </DialogHeader>

                <Tabs defaultValue="overview" className="space-y-4 sm:space-y-6">
                  <TabsList className="grid w-full grid-cols-4 h-auto">
                    <TabsTrigger value="overview" className="text-xs sm:text-sm py-2">Overview</TabsTrigger>
                    <TabsTrigger value="eligibility" className="text-xs sm:text-sm py-2">Eligibility</TabsTrigger>
                    <TabsTrigger value="documents" className="text-xs sm:text-sm py-2">Documents</TabsTrigger>
                    <TabsTrigger value="apply" className="text-xs sm:text-sm py-2">How to Apply</TabsTrigger>
                  </TabsList>

                  <TabsContent value="overview" className="space-y-4">
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg">Objective</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm sm:text-base">{selectedScheme.details.objective}</p>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg">Benefits</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-2">
                          {selectedScheme.details.benefits.map((benefit, index) => (
                            <li key={index} className="flex items-start space-x-2">
                              <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                              <span className="text-sm">{benefit}</span>
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <Card>
                        <CardContent className="p-4 text-center">
                          <Banknote className="h-8 w-8 text-green-600 mx-auto mb-2" />
                          <p className="font-semibold text-green-600">{selectedScheme.amount}</p>
                          <p className="text-xs text-muted-foreground">Financial Benefit</p>
                        </CardContent>
                      </Card>
                      
                      <Card>
                        <CardContent className="p-4 text-center">
                          <Users className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                          <p className="font-semibold text-blue-600">{selectedScheme.beneficiaries}</p>
                          <p className="text-xs text-muted-foreground">Beneficiaries</p>
                        </CardContent>
                      </Card>
                      
                      <Card>
                        <CardContent className="p-4 text-center">
                          <Calendar className="h-8 w-8 text-orange-600 mx-auto mb-2" />
                          <p className="font-semibold text-orange-600">
                            {selectedScheme.deadline === "Ongoing" 
                              ? "Ongoing" 
                              : new Date(selectedScheme.deadline).toLocaleDateString()
                            }
                          </p>
                          <p className="text-xs text-muted-foreground">Application Deadline</p>
                        </CardContent>
                      </Card>
                    </div>
                  </TabsContent>

                  <TabsContent value="eligibility" className="space-y-4">
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg">Eligibility Criteria</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-3">
                          {selectedScheme.details.eligibility.map((criteria, index) => (
                            <li key={index} className="flex items-start space-x-3">
                              <div className="w-6 h-6 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                                <span className="text-xs font-medium text-blue-600 dark:text-blue-400">
                                  {index + 1}
                                </span>
                              </div>
                              <span className="text-sm">{criteria}</span>
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>
                  </TabsContent>

                  <TabsContent value="documents" className="space-y-4">
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg">Required Documents</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="grid gap-3">
                          {selectedScheme.details.documents.map((document, index) => (
                            <div key={index} className="flex items-center space-x-3 p-3 bg-muted/20 rounded-lg">
                              <FileText className="h-5 w-5 text-blue-600 flex-shrink-0" />
                              <span className="text-sm">{document}</span>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>

                  <TabsContent value="apply" className="space-y-4">
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg">Application Process</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          {selectedScheme.details.applicationProcess.map((step, index) => (
                            <div key={index} className="flex items-start space-x-4">
                              <div className="w-8 h-8 rounded-full bg-main/20 flex items-center justify-center flex-shrink-0">
                                <span className="text-sm font-bold text-main">{index + 1}</span>
                              </div>
                              <div className="flex-1">
                                <p className="text-sm">{step}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <Card>
                        <CardContent className="p-4">
                          <div className="flex items-center space-x-2 mb-2">
                            <Globe className="h-5 w-5 text-blue-600" />
                            <span className="font-medium">Official Website</span>
                          </div>
                          <Link href={selectedScheme.website} target="_blank" className="text-sm text-blue-600 hover:underline">
                            {selectedScheme.website}
                          </Link>
                        </CardContent>
                      </Card>

                      <Card>
                        <CardContent className="p-4">
                          <div className="flex items-center space-x-2 mb-2">
                            <Phone className="h-5 w-5 text-green-600" />
                            <span className="font-medium">Helpline</span>
                          </div>
                          <p className="text-sm text-green-600 font-mono">{selectedScheme.helpline}</p>
                        </CardContent>
                      </Card>
                    </div>
                  </TabsContent>
                </Tabs>

                <div className="flex flex-col sm:flex-row justify-end space-y-2 sm:space-y-0 sm:space-x-2 pt-4 sm:pt-6 border-t">
                  <Button variant="neutral" asChild className="w-full sm:w-auto">
                    <Link href={selectedScheme.website} target="_blank">
                      <ExternalLink className="mr-2 h-3 w-3 sm:h-4 sm:w-4" />
                      <span className="text-xs sm:text-sm">Visit Official Website</span>
                    </Link>
                  </Button>
                  <Button className="w-full sm:w-auto">
                    <FileText className="mr-2 h-3 w-3 sm:h-4 sm:w-4" />
                    <span className="text-xs sm:text-sm">Apply Now</span>
                  </Button>
                </div>
              </>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default SchemesPage;