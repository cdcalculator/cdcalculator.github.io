// Load component function
async function loadComponent(file, containerId) {
  try {
    const response = await fetch(file)
    const html = await response.text()
    const container = document.getElementById(containerId)
    if (container) {
      container.innerHTML = html
      // Execute any scripts in the loaded HTML
      const scripts = container.querySelectorAll("script")
      scripts.forEach((script) => {
        const newScript = document.createElement("script")
        newScript.textContent = script.textContent
        document.body.appendChild(newScript)
      })
    }
  } catch (error) {
    console.error(`Error loading ${file}:`, error)
  }
}

// Calculator data
const calculatorsData = [
  {
    title: "Mortgage Calculator",
    description: "Calculate monthly mortgage payments and amortization",
    icon: "🏠",
    color: "var(--color-blue)",
    url: "mortgage-calculator.html",
    category: "mortgage",
  },
  {
    title: "Loan Calculator",
    description: "Calculate loan payments and total interest",
    icon: "💰",
    color: "var(--color-green)",
    url: "loan-calculator.html",
    category: "loans",
  },
  {
    title: "Investment Calculator",
    description: "Calculate investment returns and growth",
    icon: "📈",
    color: "var(--color-purple)",
    url: "investment-calculator.html",
    category: "investments",
  },
  {
    title: "Retirement Calculator",
    description: "Plan your retirement savings and income",
    icon: "🏖️",
    color: "var(--color-pink)",
    url: "retirement-calculator.html",
    category: "retirement",
  },
  {
    title: "Compound Interest",
    description: "Calculate compound interest over time",
    icon: "💹",
    color: "var(--color-yellow)",
    url: "compound-interest.html",
    category: "investments",
  },
  {
    title: "Savings Calculator",
    description: "Track your savings goals and progress",
    icon: "🏦",
    color: "var(--color-blue)",
    url: "savings-calculator.html",
    category: "savings",
  },
  {
    title: "Auto Loan Calculator",
    description: "Calculate car loan payments and interest",
    icon: "🚗",
    color: "var(--color-red)",
    url: "auto-loan-calculator.html",
    category: "loans",
  },
  {
    title: "Credit Card Payoff",
    description: "Calculate how to pay off credit card debt",
    icon: "💳",
    color: "var(--color-green)",
    url: "credit-card-calculator.html",
    category: "loans",
  },
  {
    title: "Refinance Calculator",
    description: "See if refinancing your mortgage makes sense",
    icon: "🔄",
    color: "var(--color-purple)",
    url: "refinance-calculator.html",
    category: "mortgage",
  },
  {
    title: "ROI Calculator",
    description: "Calculate return on investment percentage",
    icon: "📊",
    color: "var(--color-pink)",
    url: "roi-calculator.html",
    category: "investments",
  },
  {
    title: "Budget Calculator",
    description: "Create and manage your monthly budget",
    icon: "📝",
    color: "var(--color-yellow)",
    url: "budget-calculator.html",
    category: "savings",
  },
  {
    title: "Tax Calculator",
    description: "Estimate your income tax liability",
    icon: "🧾",
    color: "var(--color-blue)",
    url: "tax-calculator.html",
    category: "taxes",
  },
  {
    title: "Debt Payoff Calculator",
    description: "Plan your debt elimination strategy",
    icon: "💸",
    color: "var(--color-red)",
    url: "debt-payoff-calculator.html",
    category: "loans",
  },
  {
    title: "APR Calculator",
    description: "Calculate annual percentage rate",
    icon: "📉",
    color: "var(--color-green)",
    url: "apr-calculator.html",
    category: "loans",
  },
  {
    title: "Lease Calculator",
    description: "Calculate lease payments for cars",
    icon: "🔑",
    color: "var(--color-purple)",
    url: "lease-calculator.html",
    category: "loans",
  },
  {
    title: "Home Affordability",
    description: "Calculate how much house you can afford",
    icon: "🏡",
    color: "var(--color-pink)",
    url: "home-affordability.html",
    category: "mortgage",
  },
  {
    title: "Rent vs Buy Calculator",
    description: "Compare renting vs buying a home",
    icon: "⚖️",
    color: "var(--color-yellow)",
    url: "rent-vs-buy.html",
    category: "mortgage",
  },
  {
    title: "401k Calculator",
    description: "Calculate 401k retirement savings",
    icon: "💼",
    color: "var(--color-blue)",
    url: "401k-calculator.html",
    category: "retirement",
  },
  {
    title: "Stock Calculator",
    description: "Calculate stock investment returns",
    icon: "📈",
    color: "var(--color-green)",
    url: "stock-calculator.html",
    category: "investments",
  },
  {
    title: "Salary Calculator",
    description: "Convert salary between different time periods",
    icon: "💵",
    color: "var(--color-purple)",
    url: "salary-calculator.html",
    category: "income",
  },
]

// Load calculators into grid
function loadCalculators() {
  const grid = document.getElementById("calculators-grid")
  if (!grid) return

  grid.innerHTML = ""

  calculatorsData.forEach((calc, index) => {
    const card = document.createElement("a")
    card.href = calc.url
    card.className = "calculator-card"
    card.style.animationDelay = `${index * 0.05}s`

    card.innerHTML = `
            <span class="calculator-icon">${calc.icon}</span>
            <h3>${calc.title}</h3>
            <p>${calc.description}</p>
            <span class="calculator-tag" style="background-color: ${calc.color}">${calc.category}</span>
        `

    grid.appendChild(card)
  })
}

// Smooth scroll
document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault()
      const target = document.querySelector(this.getAttribute("href"))
      if (target) {
        target.scrollIntoView({
          behavior: "smooth",
          block: "start",
        })
      }
    })
  })
})

// Format currency
function formatCurrency(value) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value)
}

// Format percentage
function formatPercentage(value) {
  return value.toFixed(2) + "%"
}
