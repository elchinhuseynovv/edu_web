// Course Data
const coursesData = [
  {
    id: 1,
    title: "Complete JavaScript Mastery",
    description: "Master JavaScript from basics to advanced concepts including ES6+, async programming, and modern frameworks.",
    category: "programming",
    image: "https://images.pexels.com/photos/270348/pexels-photo-270348.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&fit=crop",
    instructor: {
      name: "John Smith",
      image: "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=60&h=60&fit=crop"
    },
    rating: 4.8,
    reviews: 1250,
    price: 89.99,
    originalPrice: 149.99,
    duration: "12 hours",
    lessons: 45,
    level: "Beginner to Advanced",
    badge: "Bestseller"
  },
  {
    id: 2,
    title: "UI/UX Design Fundamentals",
    description: "Learn the principles of user interface and user experience design with hands-on projects and real-world examples.",
    category: "design",
    image: "https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&fit=crop",
    instructor: {
      name: "Sarah Johnson",
      image: "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=60&h=60&fit=crop"
    },
    rating: 4.9,
    reviews: 890,
    price: 79.99,
    originalPrice: 129.99,
    duration: "10 hours",
    lessons: 38,
    level: "Beginner",
    badge: "New"
  },
  {
    id: 3,
    title: "Digital Marketing Strategy",
    description: "Comprehensive guide to digital marketing including SEO, social media, content marketing, and analytics.",
    category: "marketing",
    image: "https://images.pexels.com/photos/265087/pexels-photo-265087.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&fit=crop",
    instructor: {
      name: "Mike Chen",
      image: "https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=60&h=60&fit=crop"
    },
    rating: 4.7,
    reviews: 654,
    price: 69.99,
    originalPrice: 99.99,
    duration: "8 hours",
    lessons: 32,
    level: "Intermediate",
    badge: "Popular"
  },
  {
    id: 4,
    title: "Data Science with Python",
    description: "Learn data analysis, visualization, and machine learning using Python, pandas, and scikit-learn.",
    category: "data-science",
    image: "https://images.pexels.com/photos/590020/pexels-photo-590020.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&fit=crop",
    instructor: {
      name: "Dr. Emily Rodriguez",
      image: "https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=60&h=60&fit=crop"
    },
    rating: 4.9,
    reviews: 1100,
    price: 99.99,
    originalPrice: 179.99,
    duration: "15 hours",
    lessons: 52,
    level: "Intermediate to Advanced",
    badge: "Bestseller"
  },
  {
    id: 5,
    title: "Business Leadership Essentials",
    description: "Develop essential leadership skills for modern business environments including team management and strategic thinking.",
    category: "business",
    image: "https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&fit=crop",
    instructor: {
      name: "Robert Wilson",
      image: "https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=60&h=60&fit=crop"
    },
    rating: 4.6,
    reviews: 432,
    price: 59.99,
    originalPrice: 89.99,
    duration: "6 hours",
    lessons: 24,
    level: "Intermediate",
    badge: "Featured"
  },
  {
    id: 6,
    title: "React Development Bootcamp",
    description: "Build modern web applications with React, including hooks, context, routing, and state management.",
    category: "programming",
    image: "https://images.pexels.com/photos/11035380/pexels-photo-11035380.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&fit=crop",
    instructor: {
      name: "Alex Thompson",
      image: "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=60&h=60&fit=crop"
    },
    rating: 4.8,
    reviews: 987,
    price: 94.99,
    originalPrice: 159.99,
    duration: "14 hours",
    lessons: 48,
    level: "Intermediate",
    badge: "Popular"
  },
  {
    id: 7,
    title: "Graphic Design Masterclass",
    description: "Master Adobe Creative Suite and design principles to create stunning visual content for print and digital media.",
    category: "design",
    image: "https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&fit=crop",
    instructor: {
      name: "Lisa Anderson",
      image: "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=60&h=60&fit=crop"
    },
    rating: 4.7,
    reviews: 756,
    price: 84.99,
    originalPrice: 139.99,
    duration: "11 hours",
    lessons: 41,
    level: "Beginner to Intermediate",
    badge: "New"
  },
  {
    id: 8,
    title: "Social Media Marketing Pro",
    description: "Advanced strategies for social media marketing across all major platforms with analytics and ROI optimization.",
    category: "marketing",
    image: "https://images.pexels.com/photos/267389/pexels-photo-267389.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&fit=crop",
    instructor: {
      name: "Jessica Brown",
      image: "https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=60&h=60&fit=crop"
    },
    rating: 4.8,
    reviews: 623,
    price: 74.99,
    originalPrice: 119.99,
    duration: "9 hours",
    lessons: 35,
    level: "Intermediate",
    badge: "Featured"
  },
  {
    id: 9,
    title: "Machine Learning Fundamentals",
    description: "Introduction to machine learning algorithms, supervised and unsupervised learning with practical implementations.",
    category: "data-science",
    image: "https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&fit=crop",
    instructor: {
      name: "Dr. David Kim",
      image: "https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=60&h=60&fit=crop"
    },
    rating: 4.9,
    reviews: 1340,
    price: 109.99,
    originalPrice: 199.99,
    duration: "18 hours",
    lessons: 58,
    level: "Advanced",
    badge: "Bestseller"
  },
  {
    id: 10,
    title: "Entrepreneurship & Startup",
    description: "Learn how to start and scale a successful business from idea validation to funding and growth strategies.",
    category: "business",
    image: "https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&fit=crop",
    instructor: {
      name: "Mark Davis",
      image: "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=60&h=60&fit=crop"
    },
    rating: 4.6,
    reviews: 512,
    price: 79.99,
    originalPrice: 129.99,
    duration: "10 hours",
    lessons: 36,
    level: "Beginner to Intermediate",
    badge: "Popular"
  }
];

// Instructors Data
const instructorsData = [
  {
    id: 1,
    name: "John Smith",
    title: "Senior JavaScript Developer",
    image: "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop",
    bio: "10+ years of experience in web development with expertise in JavaScript, React, and Node.js.",
    courses: 5,
    students: 15000,
    rating: 4.8
  },
  {
    id: 2,
    name: "Sarah Johnson",
    title: "UX/UI Design Expert",
    image: "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop",
    bio: "Award-winning designer with 8 years of experience creating user-centered digital experiences.",
    courses: 3,
    students: 8500,
    rating: 4.9
  },
  {
    id: 3,
    name: "Dr. Emily Rodriguez",
    title: "Data Science Specialist",
    image: "https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop",
    bio: "PhD in Computer Science with specialization in machine learning and data analytics.",
    courses: 4,
    students: 12000,
    rating: 4.9
  }
];

// Testimonials Data
const testimonialsData = [
  {
    id: 1,
    name: "Sarah Johnson",
    course: "JavaScript Mastery",
    image: "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop",
    rating: 5,
    text: "The JavaScript course completely transformed my career. The instructor's teaching style is exceptional and the projects are very practical."
  },
  {
    id: 2,
    name: "Michael Chen",
    course: "UI/UX Design Pro",
    image: "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop",
    rating: 5,
    text: "Amazing platform! The UI/UX design course helped me land my dream job. The content is up-to-date and very comprehensive."
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    course: "Data Science Bootcamp",
    image: "https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop",
    rating: 5,
    text: "The data science program is incredibly thorough. I went from beginner to getting hired as a data analyst in just 6 months!"
  }
];

// Categories Data
const categoriesData = [
  {
    id: 1,
    name: "Programming",
    icon: "fas fa-code",
    count: 120,
    color: "#3b82f6"
  },
  {
    id: 2,
    name: "Design",
    icon: "fas fa-palette",
    count: 85,
    color: "#8b5cf6"
  },
  {
    id: 3,
    name: "Business",
    icon: "fas fa-briefcase",
    count: 95,
    color: "#10b981"
  },
  {
    id: 4,
    name: "Marketing",
    icon: "fas fa-bullhorn",
    count: 70,
    color: "#f59e0b"
  },
  {
    id: 5,
    name: "Data Science",
    icon: "fas fa-chart-bar",
    count: 60,
    color: "#ef4444"
  },
  {
    id: 6,
    name: "Photography",
    icon: "fas fa-camera",
    count: 45,
    color: "#06b6d4"
  }
];