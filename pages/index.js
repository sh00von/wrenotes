'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import * as AccordionPrimitive from '@radix-ui/react-accordion'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { FileIcon, BookOpen, GraduationCap, Menu, X, Droplet, Mail, Building, ChevronRight, Search } from 'lucide-react'

const courseData = [
  {
    "level": 1,
    "terms": [
      {
        "name": "Term 1",
        "subjects": [
          {
            "name": "Hydrology",
            "notes": [
              { "title": "Introduction to Hydrology", "url": "https://drive.google.com/file/d/..." },
              { "title": "Hydrologic Cycle", "url": "https://drive.google.com/file/d/..." }
            ]
          },
          {
            "name": "Hydraulic Structures Mechanics",
            "notes": [
              { "title": "Fluid Mechanics Basics", "url": "https://drive.google.com/file/d/..." },
              { "title": "Bernoulli's Principle", "url": "https://drive.google.com/file/d/..." }
            ]
          }
        ]
      },
      {
        "name": "Term 2",
        "subjects": [
          {
            "name": "Water Resources Management",
            "notes": [
              { "title": "Introduction to Water Resources", "url": "https://drive.google.com/file/d/..." },
              { "title": "Water Conservation Techniques", "url": "https://drive.google.com/file/d/..." }
            ]
          },
          {
            "name": "Hydraulic Structures",
            "notes": [
              { "title": "Dams and Reservoirs", "url": "https://drive.google.com/file/d/..." },
              { "title": "Spillways and Gates", "url": "https://drive.google.com/file/d/..." }
            ]
          }
        ]
      }
    ]
  }
]

const departmentData = {
  name: "Department of Water Resources and Civil Engineering",
  description: "Our department is dedicated to advancing the fields of water resources and civil engineering through cutting-edge research and comprehensive education.",
  faculty: [
    {
      name: "Dr. Jane Smith",
      title: "Professor and Department Chair",
      email: "jane.smith@university.edu",
      bio: "Dr. Smith has over 20 years of experience in hydraulic engineering and water resource management.",
      researchInterests: ["Sustainable water management", "Climate change impacts on water resources", "Urban water systems"]
    },
    {
      name: "Dr. Michael Johnson",
      title: "Associate Professor",
      email: "michael.johnson@university.edu",
      bio: "Dr. Johnson specializes in hydrological modeling and has contributed to numerous international water conservation projects.",
      researchInterests: ["Hydrological modeling", "Flood risk assessment", "Water quality monitoring"]
    }
  ]
}

const WaveBackground = () => (
  <div className="fixed inset-0 z-0 opacity-10">
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className="w-full h-full">
      <path fill="currentColor" fillOpacity="1" d="M0,96L48,112C96,128,192,160,288,186.7C384,213,480,235,576,213.3C672,192,768,128,864,128C960,128,1056,192,1152,213.3C1248,235,1344,213,1392,202.7L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
    </svg>
  </div>
)

const Accordion = AccordionPrimitive.Root
const AccordionItem = AccordionPrimitive.Item
const AccordionTrigger = React.forwardRef(({ children, className, ...props }, forwardedRef) => (
  <AccordionPrimitive.Header className="flex">
    <AccordionPrimitive.Trigger
      ref={forwardedRef}
      className={`${className} flex flex-1 items-center justify-between py-4 font-medium transition-all hover:underline [&[data-state=open]>svg]:rotate-90`}
      {...props}
    >
      {children}
      <ChevronRight className="h-4 w-4 transition-transform duration-200" />
    </AccordionPrimitive.Trigger>
  </AccordionPrimitive.Header>
))
AccordionTrigger.displayName = "AccordionTrigger"
const AccordionContent = React.forwardRef(({ children, className, ...props }, forwardedRef) => (
  <AccordionPrimitive.Content
    ref={forwardedRef}
    className={`${className} data-[state=open]:animate-accordion-down data-[state=closed]:animate-accordion-up overflow-hidden text-sm transition-all`}
    {...props}
  >
    <div className="pb-4 pt-0">{children}</div>
  </AccordionPrimitive.Content>
))
AccordionContent.displayName = "AccordionContent"

export default function WaterResourcesEngineering() {
  const [activeSection, setActiveSection] = useState("courses")
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [activeLevelTerm, setActiveLevelTerm] = useState(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [openAccordions, setOpenAccordions] = useState([])

  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 768)
      if (window.innerWidth >= 768) {
        setIsSidebarOpen(true)
      }
    }

    checkIsMobile()
    window.addEventListener('resize', checkIsMobile)
    return () => window.removeEventListener('resize', checkIsMobile)
  }, [])

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen)

  const filteredCourseData = courseData.map(level => ({
    ...level,
    terms: level.terms.map(term => ({
      ...term,
      subjects: term.subjects.filter(subject =>
        subject.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        subject.notes.some(note => note.title.toLowerCase().includes(searchTerm.toLowerCase()))
      )
    })).filter(term => term.subjects.length > 0)
  })).filter(level => level.terms.length > 0)

  const handleLevelTermClick = (level, termIndex) => {
    setActiveSection("courses")
    setActiveLevelTerm(`${level}-${termIndex}`)
    setOpenAccordions([`level-${level}`, `term-${termIndex}`])
    if (isMobile) setIsSidebarOpen(false)
  }

  return (
    <div className="flex h-screen bg-gradient-to-br from-blue-900 to-blue-700 text-blue-100 font-sans relative overflow-hidden">
      <WaveBackground />
      
      {/* Mobile menu button */}
      {isMobile && (
        <motion.button
          className="fixed top-4 left-4 z-50 p-2 bg-blue-500 rounded-full shadow-lg text-white"
          onClick={toggleSidebar}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          aria-label="Toggle menu"
        >
          {isSidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </motion.button>
      )}

      {/* Sidebar */}
      <AnimatePresence>
        {isSidebarOpen && (
          <motion.div
            initial={{ x: -300, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -300, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed inset-y-0 left-0 z-40 w-64 bg-blue-800 shadow-lg overflow-hidden"
          >
            <div className="p-6 border-b border-blue-700">
              <h1 className="text-2xl font-bold text-blue-100 mb-2">Water Resources</h1>
              <p className="text-sm text-blue-300">Department of Civil Engineering</p>
            </div>
            <div className="p-4">
              <Input
                type="search"
                placeholder="Search courses..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-blue-700 text-blue-100 placeholder-blue-300 border-blue-600"
              />
            </div>
            <ScrollArea className="h-[calc(100vh-180px)]">
              <nav className="px-4 py-2">
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="courses">
                    <AccordionTrigger className="text-blue-100 hover:text-blue-200">
                      <GraduationCap className="inline-block mr-2 w-5 h-5" />
                      Courses
                    </AccordionTrigger>
                    <AccordionContent>
                      {filteredCourseData.map((level) => (
                        <Accordion type="single" collapsible key={level.level} className="ml-4">
                          <AccordionItem value={`level-${level.level}`}>
                            <AccordionTrigger className="text-blue-200 hover:text-blue-100">
                              Level {level.level}
                            </AccordionTrigger>
                            <AccordionContent>
                              {level.terms.map((term, termIndex) => (
                                <motion.button
                                  key={termIndex}
                                  className={`w-full text-left p-2 mb-1 rounded transition-colors ${
                                    activeLevelTerm === `${level.level}-${termIndex}` ? "bg-blue-500 text-white" : "text-blue-200 hover:bg-blue-700"
                                  }`}
                                  onClick={() => handleLevelTermClick(level.level, termIndex)}
                                  whileHover={{ scale: 1.05 }}
                                  whileTap={{ scale: 0.95 }}
                                >
                                  <BookOpen className="inline-block mr-2 w-4 h-4" />
                                  {term.name}
                                </motion.button>
                              ))}
                            </AccordionContent>
                          </AccordionItem>
                        </Accordion>
                      ))}
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="department">
                    <AccordionTrigger className="text-blue-100 hover:text-blue-200">
                      <Building className="inline-block mr-2 w-5 h-5" />
                      Department Info
                    </AccordionTrigger>
                    <AccordionContent>
                      <motion.button
                        className={`w-full text-left p-2 mb-1 rounded transition-colors ${
                          activeSection === "department" ? "bg-blue-500 text-white" : "text-blue-200 hover:bg-blue-700"
                        }`}
                        onClick={() => {
                          setActiveSection("department")
                          if (isMobile) setIsSidebarOpen(false)
                        }}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        Overview
                      </motion.button>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </nav>
            </ScrollArea>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main content */}
      <main className={`flex-1 p-8 overflow-auto transition-all duration-300 ${isSidebarOpen ? 'md:ml-64' : ''} relative z-10`}>
        <AnimatePresence mode="wait">
          {activeSection === "courses" && (
            <motion.div
              key="courses"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <Accordion type="multiple" value={openAccordions} onValueChange={setOpenAccordions}>
                {filteredCourseData.map((level) => (
                  <AccordionItem value={`level-${level.level}`} key={level.level} className="mb-4">
                    <AccordionTrigger className="text-xl font-semibold text-blue-100 hover:text-blue-200 bg-blue-700 bg-opacity-50 p-4 rounded-t">
                      <GraduationCap className="w-6 h-6 mr-2" />
                      Level {level.level}
                    </AccordionTrigger>
                    <AccordionContent className="bg-blue-800 bg-opacity-50 rounded-b p-4">
                      <Accordion type="multiple" value={openAccordions} onValueChange={setOpenAccordions} className="w-full mt-2">
                        {level.terms.map((term, termIndex) => (
                          <AccordionItem value={`term-${termIndex}`} key={termIndex} className="mb-2">
                            <AccordionTrigger className="text-lg font-medium text-blue-200 hover:text-blue-100 bg-blue-600 bg-opacity-50 p-3 rounded-t">
                              <BookOpen className="w-5 h-5 mr-2" />
                              {term.name}
                            </AccordionTrigger>
                            <AccordionContent className="bg-blue-700 bg-opacity-50 rounded-b p-3">
                              <div className="grid md:grid-cols-2 gap-4 mt-2">
                                {term.subjects.map((subject, subjectIndex) => (
                                  <motion.div
                                    key={subjectIndex}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: subjectIndex * 0.1 }}
                                    className="bg-blue-600 bg-opacity-50 p-4 rounded"
                                  >
                                    <h3 className="text-lg font-semibold mb-2 text-blue-100 flex items-center">
                                      <Droplet className="w-4 h-4 mr-2" />
                                      {subject.name}
                                    </h3>
                                    <ul className="space-y-2">
                                      {subject.notes.map((note, noteIndex) => (
                                        <li key={noteIndex}>
                                          <a
                                            href={note.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center space-x-2 text-blue-200 hover:text-blue-100 transition-colors"
                                          >
                                            <FileIcon className="w-4 h-4" />
                                            <span>{note.title}</span>
                                          </a>
                                        </li>
                                      ))}
                                    </ul>
                                  </motion.div>
                                ))}
                              </div>
                            </AccordionContent>
                          </AccordionItem>
                        ))}
                      </Accordion>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </motion.div>
          )}

          {activeSection === "department" && (
            <motion.div
              key="department"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="space-y-8"
            >
              <div className="bg-blue-700 bg-opacity-50 p-6 rounded">
                <h2 className="text-2xl font-bold mb-4 text-blue-100">{departmentData.name}</h2>
                <p className="text-blue-200">{departmentData.description}</p>
              </div>

              <h3 className="text-xl font-bold mb-4 text-blue-100">Faculty</h3>
              {departmentData.faculty.map((faculty, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-blue-700 bg-opacity-50 p-6 rounded mb-4"
                >
                  <h4 className="text-lg font-semibold mb-2 text-blue-100">{faculty.name}</h4>
                  <p className="text-blue-200 mb-2">{faculty.title}</p>
                  <p className="text-blue-200 mb-4">{faculty.bio}</p>
                  <div className="flex items-center mb-2">
                    <Mail className="w-4 h-4 mr-2 text-blue-300" />
                    <a href={`mailto:${faculty.email}`} className="text-blue-300 hover:underline">{faculty.email}</a>
                  </div>
                  <h5 className="text-md font-semibold mb-2 text-blue-100">Research Interests:</h5>
                  <ul className="list-disc list-inside text-blue-200">
                    {faculty.researchInterests.map((interest, interestIndex) => (
                      <li key={interestIndex}>{interest}</li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  )
}