import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Search, Briefcase, TrendingUp } from "lucide-react";
import { motion } from "framer-motion";

// Mock career data
const careers = [
  {
    title: "Software Engineer",
    category: "Technology",
    demand: "Very High Demand",
    education: "B.Tech/B.E. Computer Science",
    description: "Design, develop, and maintain software applications"
  },
  {
    title: "Data Scientist",
    category: "Technology",
    demand: "Very High Demand",
    education: "B.Tech + Analytics/Statistics",
    description: "Analyze complex data to help companies make better decisions"
  },
  {
    title: "UI/UX Designer",
    category: "Technology",
    demand: "High Demand",
    education: "Design Degree/Portfolio",
    description: "Create intuitive and beautiful user interfaces"
  },
  {
    title: "Civil Engineer",
    category: "Engineering",
    demand: "High Demand",
    education: "B.Tech/B.E. Civil Engineering",
    description: "Design and oversee construction of infrastructure projects"
  },
  {
    title: "Doctor (MBBS)",
    category: "Healthcare",
    demand: "Very High Demand",
    education: "MBBS + Specialization",
    description: "Diagnose and treat patients, save lives"
  },
  {
    title: "Chartered Accountant",
    category: "Finance",
    demand: "High Demand",
    education: "CA Certification",
    description: "Manage financial records and provide tax advice"
  },
  {
    title: "IAS Officer",
    category: "Government",
    demand: "High Demand",
    education: "Any Degree + UPSC",
    description: "Serve in administrative roles in government"
  },
  {
    title: "Mechanical Engineer",
    category: "Engineering",
    demand: "High Demand",
    education: "B.Tech/B.E. Mechanical",
    description: "Design and develop mechanical systems and products"
  },
  {
    title: "Marketing Manager",
    category: "Business",
    demand: "High Demand",
    education: "BBA/MBA Marketing",
    description: "Develop and execute marketing strategies"
  }
];

const Careers = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");

  const filteredCareers = careers.filter(career =>
    career.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    career.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getDemandColor = (demand: string) => {
    if (demand.includes("Very High")) return "bg-red-100 text-red-700 border-red-200";
    if (demand.includes("High")) return "bg-orange-100 text-orange-700 border-orange-200";
    return "bg-blue-100 text-blue-700 border-blue-200";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 font-sans">

      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-6 py-6">
          <Button
            variant="ghost"
            onClick={() => navigate("/")}
            className="mb-4 text-gray-600 hover:text-gray-900"
          >
            <ArrowLeft className="mr-2 h-4 w-4" /> Back
          </Button>
          <div className="flex items-center gap-3 mb-2">
            <Briefcase className="h-8 w-8 text-indigo-600" />
            <h1 className="text-4xl font-bold text-gray-900">Explore Careers</h1>
          </div>
        </div>
      </header>

      {/* Content */}
      <div className="container mx-auto px-6 py-12">

        {/* Title Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            All Career Paths in India
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto mb-8">
            Discover 99+ career options available and find the perfect path for your future
          </p>

          {/* Search */}
          <div className="max-w-md mx-auto relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <Input
              placeholder="Search careers..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-12 h-14 text-lg border-gray-300 focus:border-indigo-600 rounded-full bg-white shadow-sm"
            />
          </div>
        </motion.div>

        {/* Career Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCareers.map((career, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              className="bg-white rounded-2xl p-6 border border-gray-200 hover:shadow-lg transition-all hover:border-indigo-200"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-100 to-purple-100 flex items-center justify-center">
                  <Briefcase className="h-6 w-6 text-indigo-600" />
                </div>
                <Badge variant="outline" className={getDemandColor(career.demand)}>
                  {career.demand}
                </Badge>
              </div>

              <h3 className="text-xl font-bold text-gray-900 mb-2">{career.title}</h3>
              <p className="text-sm text-indigo-600 mb-3">{career.category}</p>

              <div className="mb-4">
                <p className="text-sm text-gray-600 mb-2">
                  <span className="font-semibold text-gray-900">Education Required:</span>
                </p>
                <p className="text-sm text-gray-700">{career.education}</p>
              </div>

              <p className="text-gray-600 text-sm mb-4">{career.description}</p>

              <Button
                onClick={() => navigate("/pathways", { state: { career: career.title } })}
                variant="outline"
                className="w-full border-gray-300 text-gray-700 hover:bg-gray-50 rounded-lg"
              >
                View Career Path
              </Button>
            </motion.div>
          ))}
        </div>

        {filteredCareers.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No careers found matching "{searchTerm}"</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Careers;
