import type { StaticImageData } from "next/image";
import dashboard from "@/public/projects/sas-attendance/dashboard.webp";
import devices from "@/public/projects/sas-attendance/devices.webp";
import kiosk from "@/public/projects/sas-attendance/kiosk.webp";
import monitoring from "@/public/projects/sas-attendance/monitoring.webp";
import payroll from "@/public/projects/sas-attendance/payroll.webp";
import orderingLogin from "@/public/projects/sas-ordering/login.webp";
import orderingMenu from "@/public/projects/sas-ordering/menu.webp";
import orderingMenuFilter from "@/public/projects/sas-ordering/menu-filter.webp";
import orderingCart from "@/public/projects/sas-ordering/cart.webp";
import orderingPayment from "@/public/projects/sas-ordering/payment.webp";
import orderingComplete from "@/public/projects/sas-ordering/complete.webp";
import orderingReceipt from "@/public/projects/sas-ordering/receipt.webp";
import orderingSales from "@/public/projects/sas-ordering/sales.webp";
import orderingOrder from "@/public/projects/sas-ordering/order.webp";
import orderingRefund from "@/public/projects/sas-ordering/refund.webp";
import orderingSync from "@/public/projects/sas-ordering/sync.webp";
import orderingPrinter from "@/public/projects/sas-ordering/printer.webp";
import inventoryDashboard from "@/public/projects/sas-inventory/dashboard.webp";
import inventoryExpenses from "@/public/projects/sas-inventory/expenses.webp";
import inventoryLogin from "@/public/projects/sas-inventory/login.webp";
import inventoryOrders from "@/public/projects/sas-inventory/orders.webp";
import inventoryProducts from "@/public/projects/sas-inventory/products.webp";
import inventorySales from "@/public/projects/sas-inventory/sales.webp";

// Projects rendered on the projects page, each given its own page at
// /projects/<slug> (opened as a `<slug>.md` tab).
// Order here is the display order and the prev/next order.
export type Project = {
  slug: string;
  name: string;
  description: string; // one-liner; the bold tagline on the project page
  tags: string[];
  icon:
    | "cart"
    | "cloud"
    | "building"
    | "home"
    | "spark"
    | "bed"
    | "box"
    | "clock"
    | "phone";
  live?: string; // shows "live ↗" when set
  code?: string; // repo URL; without it the project is marked "private"
  // Project page only; each part is hidden until set.
  category?: string; // badge, e.g. "Product-focused" → "1. Product-focused"
  summary?: string; // longer paragraph under the tagline
  // Highlight chips, e.g. { icon: "bolt", label: "50ms ingest" }
  features?: { icon: FeatureIcon; label: string }[];
  skills?: string[]; // full skills list, shown under "Skills"
  // Grouped bullets under "Features", one column per group; an untitled
  // group renders as a plain list.
  highlights?: { title?: string; items: string[] }[];
  // Grid of images under "Screenshots"; each opens full size on click.
  screenshots?: { src: StaticImageData; alt: string; caption: string }[];
};

export type FeatureIcon =
  "bolt" | "realtime" | "cube" | "chart" | "shield" | "users";

export const projects: { sort: string; items: Project[] } = {
  sort: "sorted by impact",
  items: [
    {
      slug: "officeworks",
      name: "officeworks",
      description: "E-commerce platform development and maintenance.",
      tags: [
        "typescript",
        "react",
        "node.js",
        "aws",
        "microservices",
        "postgres",
        "no-sql",
      ],
      icon: "cart",
      live: "https://officeworks.com.au",
      skills: [
        "React.js",
        "Node.js",
        "Amazon Web Services (AWS)",
        "Jenkins",
        "Microservices",
        "Jest",
        "Mocha (JavaScript Framework)",
        "Express.js",
        "Cypress",
        "Continuous Integration and Continuous Delivery (CI/CD)",
        "Adobe Analytics",
        "TypeScript",
        "Full-Stack Development",
        "fapi",
        "Agile Environment",
        "Agile Methodologies",
        "APIs",
        "PostgreSQL",
        "Docker",
        "Git",
        "API Development",
        "Redux.js",
        "Next.js",
        "Prisma ORM",
        "GraphQL",
        "Algolia",
        "AI(Gemini OpenAI Claude)",
        "Python (Programming Language)",
      ],
    },
    {
      slug: "sas-ordering",
      name: "SAS Ordering System",
      description:
        "Mobile ordering app for Sip and Simple, connected to the SAS Inventory System.",
      tags: ["react native", "expo", "eas", "typescript"],
      icon: "phone",
      highlights: [
        {
          items: [
            "Ability to place an order",
            "Print receipt",
            "Works offline",
            "Sign in",
            "Connected to the SAS Inventory System for updated data",
          ],
        },
      ],
      screenshots: [
        {
          src: orderingLogin,
          alt: "Sign-in screen with email and password",
          caption: "Sign-in",
        },
        {
          src: orderingMenu,
          alt: "Menu grid of coffee and frappe items with prices",
          caption: "Menu by category",
        },
        {
          src: orderingMenuFilter,
          alt: "Menu filtered to the Frappe category",
          caption: "Category filter",
        },
        {
          src: orderingCart,
          alt: "Order cart with item quantities and total",
          caption: "Order cart",
        },
        {
          src: orderingPayment,
          alt: "Payment screen with dine-in or take-out, discounts, cash or G-Cash and change",
          caption: "Payment — discounts, cash or G-Cash, change",
        },
        {
          src: orderingComplete,
          alt: "Sale completed screen with the receipt summary",
          caption: "Sale completed",
        },
        {
          src: orderingReceipt,
          alt: "Virtual thermal printer preview of an 80 mm receipt",
          caption: "Receipt preview — virtual thermal printer",
        },
        {
          src: orderingSales,
          alt: "Daily sales summary with orders waiting to sync",
          caption: "Daily sales",
        },
        {
          src: orderingOrder,
          alt: "Order details with re-print, refund and delete actions",
          caption: "Order details — re-print, refund, delete",
        },
        {
          src: orderingRefund,
          alt: "Refund confirmation dialog",
          caption: "Refund confirmation",
        },
        {
          src: orderingSync,
          alt: "Sync settings to pull menu data and push saved orders",
          caption: "Sync with SAS Inventory — pull menu, push orders",
        },
        {
          src: orderingPrinter,
          alt: "Bluetooth printer settings with paper size and auto-print",
          caption: "Bluetooth printer settings",
        },
      ],
    },
    {
      slug: "sas-inventory",
      name: "SAS Inventory Management",
      description:
        "Inventory management system for tracking stock, suppliers, sales and orders for Sip and Simple.",
      tags: [
        "next.js",
        "react",
        "supabase",
        "typescript",
        "tailwindcss",
        "postgresql",
      ],
      icon: "box",
      live: "https://sas-inventory-system.vercel.app",
      // Draft bullets from the screenshots; edit freely.
      highlights: [
        {
          title: "Dashboard",
          items: [
            "Today, week and month sales at a glance",
            "Monthly net (sales − expenses) and over/short",
            "Sales vs expenses chart for the last 30 days",
            "Cash vs GCash split of sales",
          ],
        },
        {
          title: "Orders",
          items: [
            "Daily order list with order type and payment method",
            "Subtotal, discount and total per order",
            "Track refunded orders",
            "Search by order no., staff or product",
            "View the items in each order",
          ],
        },
        {
          title: "Sales",
          items: [
            "Record each day's sales by cash and GCash",
            "Cash check: expected vs counted (over/short)",
            "Running cash, GCash and pouch balances",
            "Move money between cash, GCash and pouch",
          ],
        },
        {
          title: "Expenses",
          items: [
            "Log expenses with quantity and amount",
            "Tag the source: counter, GCash or pouch",
            "See who added and updated each entry",
            "Daily totals and item search",
          ],
        },
        {
          title: "Pricing",
          items: [
            "Recipe-based product costing from ingredient prices",
            "Selling price and profit margin per product and size",
            "Manage ingredients, base sizes, categories and promos",
            "Filter products by category and size",
          ],
        },
        {
          title: "OPEX",
          items: [
            "Track operating expenses",
            "Forecast upcoming OPEX (OPEX Foresee)",
          ],
        },
      ],
      screenshots: [
        {
          src: inventoryLogin,
          alt: "Admin sign-in page with the Sip & Simple Cafe logo",
          caption: "Admin sign-in",
        },
        {
          src: inventoryDashboard,
          alt: "Dashboard with sales stat cards, a sales vs expenses chart and a cash vs GCash split",
          caption: "Dashboard — sales vs expenses",
        },
        {
          src: inventoryOrders,
          alt: "Orders table with order type, payment and a refunded order",
          caption: "Orders — daily orders and refunds",
        },
        {
          src: inventorySales,
          alt: "Recorded day with sales, expenses, cash check and balances",
          caption: "Sales — daily close and cash check",
        },
        {
          src: inventoryExpenses,
          alt: "Expense log of items tagged counter or pouch",
          caption: "Expenses — daily expense log",
        },
        {
          src: inventoryProducts,
          alt: "Product cards with recipe costing and selling price",
          caption: "Products — recipe costing per product",
        },
      ],
    },
    {
      slug: "sas-attendance",
      name: "SAS Attendance Monitoring",
      description:
        "Attendance monitoring system for logging time-in/out and generating payroll for Sip and Simple.",
      tags: [
        "next.js",
        "react",
        "supabase",
        "typescript",
        "tailwindcss",
        "postgresql",
      ],
      icon: "clock",
      live: "https://sas-attendance-monitoring.vercel.app",
      highlights: [
        {
          title: "Attendance Monitoring",
          items: [
            "Track staff time-in/time-out",
            "Monitor late arrivals and missing punches",
            "Track working hours and overtime",
            "View real-time staff status",
            "Add or manually edit attendance entries",
          ],
        },
        {
          title: "Payroll",
          items: [
            "Calculate basic daily pay",
            "Calculate overtime pay",
            "Account for late/early-leave deductions",
            "Generate payroll summaries per employee/date range",
            "Print or save payroll reports as PDF",
          ],
        },
        {
          title: "Leave Management",
          items: [
            "Manage vacation, sick, and other leave types",
            "Track employees currently on leave",
            "Record leave reasons and status",
            "Include leave information in attendance/payroll records",
          ],
        },
      ],
      screenshots: [
        {
          src: kiosk,
          alt: "Punch kiosk with a camera view, name and PIN fields, and Punch In and Punch Out buttons",
          caption: "Punch kiosk — face capture + PIN",
        },
        {
          src: dashboard,
          alt: "Admin dashboard of staff cards marked Late, Done or On Leave",
          caption: "Dashboard — live staff status",
        },
        {
          src: monitoring,
          alt: "Monitoring table of time-in and time-out photos, hours and overtime per staff",
          caption: "Monitoring — time entries and overtime",
        },
        {
          src: payroll,
          alt: "Payroll panel with daily basic and overtime pay and a total",
          caption: "Payroll — per-employee summary",
        },
        {
          src: devices,
          alt: "Devices list of browsers registered to open the punch page",
          caption: "Devices — registered punch browsers",
        },
      ],
    },
    {
      slug: "nimbus",
      name: "nimbus",
      description: "Fintech company.",
      tags: ["typescript", "aws", "react", "vue.js", "php", "laravel"],
      icon: "cloud",
      live: "https://nimbus.emersion.com/",
    },
    {
      slug: "digital-central",
      name: "digital-central",
      description: "Real estate and property management platform.",
      tags: ["javascript", "react", "php", "laravel", "aws", "mysql"],
      icon: "building",
      live: "https://digitalcentral.com.au",
    },
    {
      slug: "lenderhomepage",
      name: "lenderhomepage",
      description: "Fintech company.",
      tags: ["php", "laravel", "aws", "mysql", "javascript", "vue.js"],
      icon: "home",
      live: "https://lenderhomepage.com.au",
    },
    {
      slug: "hippocamp",
      name: "hippocamp",
      description: "Fintech company.",
      tags: ["php", "laravel", "aws", "aws", "mysql"],
      icon: "spark",
    },
    {
      slug: "prime-hotel",
      name: "prime-hotel",
      description: "Hotel booking platform.",
      tags: ["php", "mysql", "wordpress"],
      icon: "bed",
    },
  ],
};
