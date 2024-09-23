export default function handler(req, res) {
    // Simulating department data
    const departmentData = {
      name: "Department of Water Resources Engineering",
      description: "The Department of Water Resources Engineering specializes in the study of hydraulic structures, hydrology, and environmental engineering, focusing on sustainable water management.",
      faculty: [
        {
          name: "Dr. John Doe",
          title: "Professor",
          bio: "Dr. John Doe has over 20 years of experience in hydrodynamic modeling and water resource management. His research focuses on sustainable water systems.",
          email: "johndoe@example.com",
          researchInterests: [
            "Hydrodynamic Modeling",
            "Water Resource Management",
            "Environmental Hydraulics"
          ]
        },
        {
          name: "Dr. Jane Smith",
          title: "Associate Professor",
          bio: "Dr. Jane Smith's work emphasizes hydrology and the effects of climate change on water resources. She has published extensively in the field of flood risk management.",
          email: "janesmith@example.com",
          researchInterests: [
            "Hydrology",
            "Climate Change Impact",
            "Flood Risk Management"
          ]
        },
        {
          name: "Dr. Emily Zhang",
          title: "Assistant Professor",
          bio: "Dr. Emily Zhang is a leading researcher in computational fluid dynamics. Her work explores water flow in natural environments and how engineering can mitigate the effects of extreme weather.",
          email: "emilyzhang@example.com",
          researchInterests: [
            "Computational Fluid Dynamics",
            "Sustainable Engineering",
            "Water Flow in Natural Environments"
          ]
        }
      ]
    };
  
    // Responding with the department data as JSON
    res.status(200).json(departmentData);
  }
  