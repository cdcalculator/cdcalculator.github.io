// Mortgage Calculator
function calculateMortgage() {
  const homePrice = Number.parseFloat(document.getElementById("loanAmount").value) || 0
  const downPayment = Number.parseFloat(document.getElementById("downPayment").value) || 0
  const interestRate = Number.parseFloat(document.getElementById("interestRate").value) || 0
  const loanTerm = Number.parseInt(document.getElementById("loanTerm").value) || 30
  const propertyTax = Number.parseFloat(document.getElementById("propertyTax").value) || 0
  const insurance = Number.parseFloat(document.getElementById("insurance").value) || 0

  const principal = homePrice - downPayment
  const monthlyRate = interestRate / 100 / 12
  const numberOfPayments = loanTerm * 12

  // Calculate monthly principal and interest
  const monthlyPI =
    (principal * (monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments))) /
    (Math.pow(1 + monthlyRate, numberOfPayments) - 1)

  const monthlyTax = propertyTax / 12
  const monthlyInsurance = insurance / 12
  const totalMonthlyPayment = monthlyPI + monthlyTax + monthlyInsurance

  const totalAmount = monthlyPI * numberOfPayments + propertyTax * loanTerm + insurance * loanTerm
  const totalInterest = monthlyPI * numberOfPayments - principal

  // Update results
  document.getElementById("monthlyPayment").textContent = formatCurrency(totalMonthlyPayment)
  document.getElementById("totalInterest").textContent = formatCurrency(totalInterest)
  document.getElementById("totalAmount").textContent = formatCurrency(totalAmount)
  document.getElementById("principalInterest").textContent = formatCurrency(monthlyPI)
  document.getElementById("taxMonthly").textContent = formatCurrency(monthlyTax)
  document.getElementById("insuranceMonthly").textContent = formatCurrency(monthlyInsurance)
}

// Loan Calculator
function calculateLoan() {
  const principal = Number.parseFloat(document.getElementById("loanAmount").value) || 0
  const annualRate = Number.parseFloat(document.getElementById("interestRate").value) || 0
  const years = Number.parseFloat(document.getElementById("loanTerm").value) || 0

  const monthlyRate = annualRate / 100 / 12
  const numberOfPayments = years * 12

  const monthlyPayment =
    (principal * (monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments))) /
    (Math.pow(1 + monthlyRate, numberOfPayments) - 1)

  const totalAmount = monthlyPayment * numberOfPayments
  const totalInterest = totalAmount - principal

  document.getElementById("monthlyPayment").textContent = formatCurrency(monthlyPayment)
  document.getElementById("totalInterest").textContent = formatCurrency(totalInterest)
  document.getElementById("totalAmount").textContent = formatCurrency(totalAmount)
}

// Investment Calculator
function calculateInvestment() {
  const initialInvestment = Number.parseFloat(document.getElementById("initialAmount").value) || 0
  const monthlyContribution = Number.parseFloat(document.getElementById("monthlyContribution").value) || 0
  const annualReturn = Number.parseFloat(document.getElementById("returnRate").value) || 0
  const years = Number.parseInt(document.getElementById("investmentYears").value) || 0

  const monthlyRate = annualReturn / 100 / 12
  const months = years * 12

  // Future value of initial investment
  const futureValueInitial = initialInvestment * Math.pow(1 + monthlyRate, months)

  // Future value of monthly contributions
  const futureValueContributions = monthlyContribution * ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate)

  const totalValue = futureValueInitial + futureValueContributions
  const totalContributed = initialInvestment + monthlyContribution * months
  const totalGain = totalValue - totalContributed

  document.getElementById("finalValue").textContent = formatCurrency(totalValue)
  document.getElementById("totalContributed").textContent = formatCurrency(totalContributed)
  document.getElementById("totalGain").textContent = formatCurrency(totalGain)
}

// Savings Calculator
function calculateSavings() {
  const savingsGoal = Number.parseFloat(document.getElementById("savingsGoal").value) || 0
  const initialAmount = Number.parseFloat(document.getElementById("initialAmount").value) || 0
  const monthlyDeposit = Number.parseFloat(document.getElementById("monthlyDeposit").value) || 0
  const interestRate = Number.parseFloat(document.getElementById("interestRate").value) || 0

  const monthlyRate = interestRate / 100 / 12

  // Calculate months needed to reach goal
  let currentAmount = initialAmount
  let months = 0
  const maxMonths = 600 // 50 years max

  while (currentAmount < savingsGoal && months < maxMonths) {
    currentAmount = currentAmount * (1 + monthlyRate) + monthlyDeposit
    months++
  }

  const years = Math.floor(months / 12)
  const remainingMonths = months % 12
  const totalDeposited = initialAmount + monthlyDeposit * months
  const totalInterest = savingsGoal - totalDeposited

  document.getElementById("timeToGoal").textContent = `${years} years ${remainingMonths} months`
  document.getElementById("totalDeposited").textContent = formatCurrency(totalDeposited)
  document.getElementById("totalInterest").textContent = formatCurrency(totalInterest)
}

// Helper function - already defined in app.js but included here for calculator pages
function formatCurrency(value) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value)
}
