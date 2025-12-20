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

// CD Calculator
function calculateCD() {
  const deposit = Number.parseFloat(document.getElementById("depositAmount").value) || 0
  const term = Number.parseInt(document.getElementById("cdTerm").value) || 12
  const rate = Number.parseFloat(document.getElementById("interestRate").value) || 0
  const frequency = Number.parseInt(document.getElementById("compounding").value) || 12

  const years = term / 12
  const n = frequency
  const r = rate / 100

  // Compound interest formula: A = P(1 + r/n)^(nt)
  const finalBalance = deposit * Math.pow(1 + r / n, n * years)
  const interestEarned = finalBalance - deposit

  // Calculate APY
  const apy = (Math.pow(1 + r / n, n) - 1) * 100

  // Calculate maturity date
  const today = new Date()
  const maturityDate = new Date(today.setMonth(today.getMonth() + term))

  document.getElementById("finalBalance").textContent = formatCurrency(finalBalance)
  document.getElementById("interestEarned").textContent = formatCurrency(interestEarned)
  document.getElementById("apy").textContent = apy.toFixed(2) + "%"
  document.getElementById("principalAmount").textContent = formatCurrency(deposit)
  document.getElementById("termLength").textContent = term + " months"
  document.getElementById("maturityDate").textContent = maturityDate.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })
}

// Retirement Calculator
function calculateRetirement() {
  const currentAge = Number.parseInt(document.getElementById("currentAge").value) || 30
  const retirementAge = Number.parseInt(document.getElementById("retirementAge").value) || 65
  const currentSavings = Number.parseFloat(document.getElementById("currentSavings").value) || 0
  const monthlyContrib = Number.parseFloat(document.getElementById("monthlyContribution").value) || 0
  const returnRate = Number.parseFloat(document.getElementById("returnRate").value) || 7
  const inflationRate = Number.parseFloat(document.getElementById("inflationRate").value) || 2.5

  const yearsToRetirement = retirementAge - currentAge
  const months = yearsToRetirement * 12
  const monthlyRate = returnRate / 100 / 12

  // Future value calculation
  const fvInitial = currentSavings * Math.pow(1 + monthlyRate, months)
  const fvContributions = monthlyContrib * ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate)
  const totalSavings = fvInitial + fvContributions

  const totalContributions = currentSavings + monthlyContrib * months
  const investmentGains = totalSavings - totalContributions

  // Inflation adjustment
  const realValue = totalSavings / Math.pow(1 + inflationRate / 100, yearsToRetirement)

  // Estimated monthly income (4% rule)
  const monthlyIncome = (totalSavings * 0.04) / 12

  document.getElementById("retirementSavings").textContent = formatCurrency(totalSavings)
  document.getElementById("totalContributions").textContent = formatCurrency(totalContributions)
  document.getElementById("investmentGains").textContent = formatCurrency(investmentGains)
  document.getElementById("yearsToRetirement").textContent = yearsToRetirement + " years"
  document.getElementById("realValue").textContent = formatCurrency(realValue)
  document.getElementById("monthlyIncome").textContent = formatCurrency(monthlyIncome)
}

// Compound Interest Calculator
function calculateCompound() {
  const principal = Number.parseFloat(document.getElementById("principal").value) || 0
  const contribution = Number.parseFloat(document.getElementById("contribution").value) || 0
  const contributionFreq = Number.parseInt(document.getElementById("contributionFreq").value) || 12
  const rate = Number.parseFloat(document.getElementById("rate").value) || 0
  const years = Number.parseFloat(document.getElementById("years").value) || 0
  const compoundFreq = Number.parseInt(document.getElementById("compoundFreq").value) || 12

  const r = rate / 100
  const n = compoundFreq
  const t = years

  // Future value of principal
  const fvPrincipal = principal * Math.pow(1 + r / n, n * t)

  // Future value of contributions (using PMT formula)
  const contributionPerYear = contribution * contributionFreq
  const monthlyRate = r / n
  const totalPeriods = n * t
  const fvContributions =
    (contributionPerYear * ((Math.pow(1 + monthlyRate, totalPeriods) - 1) / monthlyRate)) / contributionFreq

  const futureValue = fvPrincipal + fvContributions
  const totalContributed = principal + contribution * contributionFreq * years
  const totalInterest = futureValue - totalContributed

  // Effective annual rate
  const effectiveRate = (Math.pow(1 + r / n, n) - 1) * 100

  document.getElementById("futureValue").textContent = formatCurrency(futureValue)
  document.getElementById("totalPrincipal").textContent = formatCurrency(totalContributed)
  document.getElementById("totalInterestEarned").textContent = formatCurrency(totalInterest)
  document.getElementById("initialInv").textContent = formatCurrency(principal)
  document.getElementById("contribTotal").textContent = formatCurrency(contribution * contributionFreq * years)
  document.getElementById("effectiveRate").textContent = effectiveRate.toFixed(2) + "%"
}

// Auto Loan Calculator
function calculateAutoLoan() {
  const carPrice = Number.parseFloat(document.getElementById("carPrice").value) || 0
  const downPayment = Number.parseFloat(document.getElementById("downPayment").value) || 0
  const tradeIn = Number.parseFloat(document.getElementById("tradeIn").value) || 0
  const salesTax = Number.parseFloat(document.getElementById("salesTax").value) || 0
  const rate = Number.parseFloat(document.getElementById("interestRate").value) || 0
  const term = Number.parseInt(document.getElementById("loanTerm").value) || 60

  const taxAmount = carPrice * (salesTax / 100)
  const loanAmount = carPrice - downPayment - tradeIn
  const amountFinanced = loanAmount + taxAmount

  const monthlyRate = rate / 100 / 12
  const monthlyPayment =
    (amountFinanced * (monthlyRate * Math.pow(1 + monthlyRate, term))) / (Math.pow(1 + monthlyRate, term) - 1)

  const totalCost = monthlyPayment * term
  const totalInterest = totalCost - amountFinanced

  document.getElementById("monthlyPayment").textContent = formatCurrency(monthlyPayment)
  document.getElementById("totalInterest").textContent = formatCurrency(totalInterest)
  document.getElementById("totalCost").textContent = formatCurrency(totalCost)
  document.getElementById("loanAmount").textContent = formatCurrency(loanAmount)
  document.getElementById("taxAmount").textContent = formatCurrency(taxAmount)
  document.getElementById("amountFinanced").textContent = formatCurrency(amountFinanced)
}

// Budget Calculator
function calculateBudget() {
  const salary = Number.parseFloat(document.getElementById("salary").value) || 0
  const otherIncome = Number.parseFloat(document.getElementById("otherIncome").value) || 0
  const housing = Number.parseFloat(document.getElementById("housing").value) || 0
  const utilities = Number.parseFloat(document.getElementById("utilities").value) || 0
  const food = Number.parseFloat(document.getElementById("food").value) || 0
  const transportation = Number.parseFloat(document.getElementById("transportation").value) || 0
  const entertainment = Number.parseFloat(document.getElementById("entertainment").value) || 0
  const otherExpenses = Number.parseFloat(document.getElementById("otherExpenses").value) || 0

  const totalIncome = salary + otherIncome
  const totalExpenses = housing + utilities + food + transportation + entertainment + otherExpenses
  const netBalance = totalIncome - totalExpenses

  const savingsRate = totalIncome > 0 ? (netBalance / totalIncome) * 100 : 0
  const housingRatio = totalIncome > 0 ? (housing / totalIncome) * 100 : 0

  let status = "Balanced"
  if (netBalance > 0) status = "Surplus"
  if (netBalance < 0) status = "Deficit"

  document.getElementById("totalIncome").textContent = formatCurrency(totalIncome)
  document.getElementById("totalExpenses").textContent = formatCurrency(totalExpenses)
  document.getElementById("netBalance").textContent = formatCurrency(netBalance)
  document.getElementById("savingsRate").textContent = savingsRate.toFixed(1) + "%"
  document.getElementById("housingRatio").textContent = housingRatio.toFixed(1) + "%"
  document.getElementById("budgetStatus").textContent = status
}

// Credit Card Payoff Calculator
function calculateCreditCard() {
  const balance = Number.parseFloat(document.getElementById("balance").value) || 0
  const apr = Number.parseFloat(document.getElementById("apr").value) || 0
  const monthlyPayment = Number.parseFloat(document.getElementById("monthlyPayment").value) || 0

  const monthlyRate = apr / 100 / 12

  let remainingBalance = balance
  let months = 0
  let totalInterest = 0
  const maxMonths = 600

  while (remainingBalance > 0 && months < maxMonths) {
    const interestCharge = remainingBalance * monthlyRate
    totalInterest += interestCharge
    remainingBalance = remainingBalance + interestCharge - monthlyPayment
    months++

    if (monthlyPayment <= interestCharge) {
      months = maxMonths
      break
    }
  }

  const totalPaid = balance + totalInterest
  const interestRatio = balance > 0 ? (totalInterest / balance) * 100 : 0

  const today = new Date()
  const debtFreeDate = new Date(today.setMonth(today.getMonth() + months))

  document.getElementById("payoffTime").textContent = months + " months"
  document.getElementById("totalInterest").textContent = formatCurrency(totalInterest)
  document.getElementById("totalPaid").textContent = formatCurrency(totalPaid)
  document.getElementById("debtFreeDate").textContent = debtFreeDate.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
  })
  document.getElementById("monthlyRate").textContent = (monthlyRate * 100).toFixed(2) + "%"
  document.getElementById("interestRatio").textContent = interestRatio.toFixed(1) + "%"
}

// ROI Calculator
function calculateROI() {
  const initialInvestment = Number.parseFloat(document.getElementById("initialInvestment").value) || 0
  const finalValue = Number.parseFloat(document.getElementById("finalValue").value) || 0
  const additionalCosts = Number.parseFloat(document.getElementById("additionalCosts").value) || 0
  const years = Number.parseFloat(document.getElementById("investmentPeriod").value) || 1

  const totalInvestment = initialInvestment + additionalCosts
  const investmentGain = finalValue - totalInvestment
  const roiPercent = totalInvestment > 0 ? (investmentGain / totalInvestment) * 100 : 0

  const annualizedReturn =
    totalInvestment > 0 && years > 0 ? (Math.pow(finalValue / totalInvestment, 1 / years) - 1) * 100 : 0

  let performance = "Break Even"
  if (roiPercent > 10) performance = "Excellent"
  else if (roiPercent > 5) performance = "Good"
  else if (roiPercent > 0) performance = "Positive"
  else if (roiPercent < 0) performance = "Loss"

  document.getElementById("roiPercent").textContent = roiPercent.toFixed(2) + "%"
  document.getElementById("investmentGain").textContent = formatCurrency(investmentGain)
  document.getElementById("annualizedReturn").textContent = annualizedReturn.toFixed(2) + "%"
  document.getElementById("totalInvested").textContent = formatCurrency(totalInvestment)
  document.getElementById("netProfit").textContent = formatCurrency(investmentGain)
  document.getElementById("performance").textContent = performance
}

// Student Loan Calculator
function calculateStudentLoan() {
  const loanAmount = Number.parseFloat(document.getElementById("loanAmount").value) || 0
  const rate = Number.parseFloat(document.getElementById("interestRate").value) || 0
  const term = Number.parseInt(document.getElementById("loanTerm").value) || 10
  const gracePeriod = Number.parseInt(document.getElementById("gracePeriod").value) || 6

  const monthlyRate = rate / 100 / 12
  const numberOfPayments = term * 12

  const monthlyPayment =
    (loanAmount * (monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments))) /
    (Math.pow(1 + monthlyRate, numberOfPayments) - 1)

  const totalRepaid = monthlyPayment * numberOfPayments
  const totalInterest = totalRepaid - loanAmount

  const graceInterest = loanAmount * monthlyRate * gracePeriod

  const today = new Date()
  const firstPaymentDate = new Date(today.setMonth(today.getMonth() + gracePeriod))
  const payoffDate = new Date(firstPaymentDate)
  payoffDate.setMonth(payoffDate.getMonth() + numberOfPayments)

  document.getElementById("monthlyPayment").textContent = formatCurrency(monthlyPayment)
  document.getElementById("totalInterest").textContent = formatCurrency(totalInterest)
  document.getElementById("totalRepaid").textContent = formatCurrency(totalRepaid)
  document.getElementById("firstPayment").textContent = firstPaymentDate.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
  })
  document.getElementById("payoffDate").textContent = payoffDate.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
  })
  document.getElementById("graceInterest").textContent = formatCurrency(graceInterest)
}

// Tax Calculator
function calculateTax() {
  const annualIncome = Number.parseFloat(document.getElementById("annualIncome").value) || 0
  const deductions = Number.parseFloat(document.getElementById("deductions").value) || 0
  const stateRate = Number.parseFloat(document.getElementById("stateRate").value) || 0

  const taxableIncome = Math.max(0, annualIncome - deductions)

  // Simplified 2023 federal tax brackets (single filer)
  let federalTax = 0
  if (taxableIncome > 578125) {
    federalTax = 174238.25 + (taxableIncome - 578125) * 0.37
  } else if (taxableIncome > 231250) {
    federalTax = 52832.75 + (taxableIncome - 231250) * 0.35
  } else if (taxableIncome > 182100) {
    federalTax = 37104 + (taxableIncome - 182100) * 0.32
  } else if (taxableIncome > 95375) {
    federalTax = 16290 + (taxableIncome - 95375) * 0.24
  } else if (taxableIncome > 44725) {
    federalTax = 5147 + (taxableIncome - 44725) * 0.22
  } else if (taxableIncome > 11000) {
    federalTax = 1100 + (taxableIncome - 11000) * 0.12
  } else {
    federalTax = taxableIncome * 0.1
  }

  const stateTax = annualIncome * (stateRate / 100)
  const totalTax = federalTax + stateTax
  const takeHomePay = annualIncome - totalTax
  const effectiveTaxRate = annualIncome > 0 ? (totalTax / annualIncome) * 100 : 0
  const monthlyTakeHome = takeHomePay / 12

  document.getElementById("federalTax").textContent = formatCurrency(federalTax)
  document.getElementById("totalTax").textContent = formatCurrency(totalTax)
  document.getElementById("takeHomePay").textContent = formatCurrency(takeHomePay)
  document.getElementById("taxableIncome").textContent = formatCurrency(taxableIncome)
  document.getElementById("effectiveTaxRate").textContent = effectiveTaxRate.toFixed(1) + "%"
  document.getElementById("monthlyTakeHome").textContent = formatCurrency(monthlyTakeHome)
}

// DTI Calculator
function calculateDTI() {
  const grossIncome = Number.parseFloat(document.getElementById("grossIncome").value) || 0
  const mortgageRent = Number.parseFloat(document.getElementById("mortgageRent").value) || 0
  const carPayment = Number.parseFloat(document.getElementById("carPayment").value) || 0
  const creditCards = Number.parseFloat(document.getElementById("creditCards").value) || 0
  const otherDebts = Number.parseFloat(document.getElementById("otherDebts").value) || 0

  const totalDebts = mortgageRent + carPayment + creditCards + otherDebts
  const frontEndDTI = grossIncome > 0 ? (mortgageRent / grossIncome) * 100 : 0
  const backEndDTI = grossIncome > 0 ? (totalDebts / grossIncome) * 100 : 0

  let qualification = "Excellent"
  if (backEndDTI > 50) qualification = "Poor"
  else if (backEndDTI > 43) qualification = "Fair"
  else if (backEndDTI > 36) qualification = "Good"

  const availableIncome = grossIncome - totalDebts
  const debtCapacity = grossIncome * 0.36 - totalDebts

  document.getElementById("frontEndDTI").textContent = frontEndDTI.toFixed(1) + "%"
  document.getElementById("backEndDTI").textContent = backEndDTI.toFixed(1) + "%"
  document.getElementById("qualification").textContent = qualification
  document.getElementById("totalDebts").textContent = formatCurrency(totalDebts)
  document.getElementById("availableIncome").textContent = formatCurrency(availableIncome)
  document.getElementById("debtCapacity").textContent = formatCurrency(Math.max(0, debtCapacity))
}

// Refinance Calculator
function calculateRefinance() {
  const currentBalance = Number.parseFloat(document.getElementById("currentBalance").value) || 0
  const currentRate = Number.parseFloat(document.getElementById("currentRate").value) || 0
  const remainingYears = Number.parseFloat(document.getElementById("remainingYears").value) || 0
  const newRate = Number.parseFloat(document.getElementById("newRate").value) || 0
  const newTerm = Number.parseInt(document.getElementById("newTerm").value) || 0
  const closingCosts = Number.parseFloat(document.getElementById("closingCosts").value) || 0

  const currentMonthlyRate = currentRate / 100 / 12
  const currentPayments = remainingYears * 12
  const currentPayment =
    (currentBalance * (currentMonthlyRate * Math.pow(1 + currentMonthlyRate, currentPayments))) /
    (Math.pow(1 + currentMonthlyRate, currentPayments) - 1)

  const newMonthlyRate = newRate / 100 / 12
  const newPayments = newTerm * 12
  const newPayment =
    (currentBalance * (newMonthlyRate * Math.pow(1 + newMonthlyRate, newPayments))) /
    (Math.pow(1 + newMonthlyRate, newPayments) - 1)

  const monthlySavings = currentPayment - newPayment
  const breakEvenMonths = monthlySavings > 0 ? Math.ceil(closingCosts / monthlySavings) : 0

  const currentTotalPaid = currentPayment * currentPayments
  const newTotalPaid = newPayment * newPayments
  const totalSavings = currentTotalPaid - newTotalPaid - closingCosts
  const interestSavings = currentTotalPaid - currentBalance - (newTotalPaid - currentBalance)

  let recommendation = "Not Recommended"
  if (totalSavings > 0 && breakEvenMonths < remainingYears * 12) {
    recommendation = "Recommended"
  }

  document.getElementById("monthlySavings").textContent = formatCurrency(monthlySavings)
  document.getElementById("totalSavings").textContent = formatCurrency(totalSavings)
  document.getElementById("breakEven").textContent = breakEvenMonths + " months"
  document.getElementById("currentPayment").textContent = formatCurrency(currentPayment)
  document.getElementById("newPayment").textContent = formatCurrency(newPayment)
  document.getElementById("interestSavings").textContent = formatCurrency(interestSavings)
  document.getElementById("recommendation").textContent = recommendation
}

// Debt Payoff Calculator
function calculateDebtPayoff() {
  const totalDebt = Number.parseFloat(document.getElementById("totalDebt").value) || 0
  const avgInterest = Number.parseFloat(document.getElementById("avgInterest").value) || 0
  const monthlyPayment = Number.parseFloat(document.getElementById("monthlyPayment").value) || 0
  const extraPayment = Number.parseFloat(document.getElementById("extraPayment").value) || 0
  const method = document.getElementById("payoffMethod").value

  const totalPayment = monthlyPayment + extraPayment
  const monthlyRate = avgInterest / 100 / 12

  let balance = totalDebt
  let months = 0
  let totalInterest = 0
  const maxMonths = 600

  while (balance > 0 && months < maxMonths) {
    const interestCharge = balance * monthlyRate
    totalInterest += interestCharge
    balance = balance + interestCharge - totalPayment
    months++

    if (totalPayment <= interestCharge) {
      months = maxMonths
      break
    }
  }

  const totalPaid = totalDebt + totalInterest
  const interestSaved = totalDebt * 0.15 // Simplified estimate

  const today = new Date()
  const debtFreeDate = new Date(today.setMonth(today.getMonth() + months))

  const strategyName = method === "avalanche" ? "Avalanche Method" : "Snowball Method"

  document.getElementById("payoffTime").textContent = months + " months"
  document.getElementById("totalInterest").textContent = formatCurrency(totalInterest)
  document.getElementById("totalPaid").textContent = formatCurrency(totalPaid)
  document.getElementById("debtFreeDate").textContent = debtFreeDate.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
  })
  document.getElementById("interestSaved").textContent = formatCurrency(interestSaved)
  document.getElementById("strategy").textContent = strategyName
  document.getElementById("progress").textContent = "On Track"
}

// APR Calculator
function calculateAPR() {
  const loanAmount = Number.parseFloat(document.getElementById("loanAmount").value) || 0
  const interestRate = Number.parseFloat(document.getElementById("interestRate").value) || 0
  const loanTerm = Number.parseInt(document.getElementById("loanTerm").value) || 12
  const originationFee = Number.parseFloat(document.getElementById("originationFee").value) || 0
  const otherFees = Number.parseFloat(document.getElementById("otherFees").value) || 0

  const totalFees = originationFee + otherFees
  const netLoanAmount = loanAmount - totalFees

  const monthlyRate = interestRate / 100 / 12
  const monthlyPayment =
    (loanAmount * (monthlyRate * Math.pow(1 + monthlyRate, loanTerm))) / (Math.pow(1 + monthlyRate, loanTerm) - 1)

  const totalPaid = monthlyPayment * loanTerm
  const totalInterest = totalPaid - loanAmount
  const totalCost = totalPaid + totalFees

  // Simplified APR calculation
  const aprRate = ((totalInterest + totalFees) / netLoanAmount / (loanTerm / 12)) * 100
  const rateDiff = aprRate - interestRate

  document.getElementById("aprRate").textContent = aprRate.toFixed(2) + "%"
  document.getElementById("monthlyPayment").textContent = formatCurrency(monthlyPayment)
  document.getElementById("totalCost").textContent = formatCurrency(totalCost)
  document.getElementById("principal").textContent = formatCurrency(loanAmount)
  document.getElementById("totalInterest").textContent = formatCurrency(totalInterest)
  document.getElementById("totalFees").textContent = formatCurrency(totalFees)
  document.getElementById("rateDiff").textContent = rateDiff.toFixed(2) + "%"
}

// Lease Calculator
function calculateLease() {
  const msrp = Number.parseFloat(document.getElementById("msrp").value) || 0
  const salePrice = Number.parseFloat(document.getElementById("salePrice").value) || 0
  const downPayment = Number.parseFloat(document.getElementById("downPayment").value) || 0
  const residualPercent = Number.parseFloat(document.getElementById("residualPercent").value) || 0
  const moneyFactor = Number.parseFloat(document.getElementById("moneyFactor").value) || 0
  const leaseTerm = Number.parseInt(document.getElementById("leaseTerm").value) || 36
  const salesTax = Number.parseFloat(document.getElementById("salesTax").value) || 0

  const residualValue = msrp * (residualPercent / 100)
  const netCapCost = salePrice - downPayment
  const depreciation = netCapCost - residualValue
  const monthlyDepreciation = depreciation / leaseTerm

  const financeCharge = (netCapCost + residualValue) * moneyFactor
  const basePayment = monthlyDepreciation + financeCharge
  const taxAmount = basePayment * (salesTax / 100)
  const monthlyPayment = basePayment + taxAmount

  const totalCost = monthlyPayment * leaseTerm + downPayment
  const aprEquivalent = moneyFactor * 2400
  const dueAtSigning = downPayment + monthlyPayment

  document.getElementById("monthlyPayment").textContent = formatCurrency(monthlyPayment)
  document.getElementById("totalCost").textContent = formatCurrency(totalCost)
  document.getElementById("aprEquivalent").textContent = aprEquivalent.toFixed(2) + "%"
  document.getElementById("depreciation").textContent = formatCurrency(depreciation)
  document.getElementById("financeCharge").textContent = formatCurrency(financeCharge * leaseTerm)
  document.getElementById("residualValue").textContent = formatCurrency(residualValue)
  document.getElementById("dueAtSigning").textContent = formatCurrency(dueAtSigning)
}

// Home Affordability Calculator
function calculateAffordability() {
  const annualIncome = Number.parseFloat(document.getElementById("annualIncome").value) || 0
  const monthlyDebts = Number.parseFloat(document.getElementById("monthlyDebts").value) || 0
  const downPayment = Number.parseFloat(document.getElementById("downPayment").value) || 0
  const interestRate = Number.parseFloat(document.getElementById("interestRate").value) || 0
  const loanTerm = Number.parseInt(document.getElementById("loanTerm").value) || 30
  const propertyTax = Number.parseFloat(document.getElementById("propertyTax").value) || 0
  const homeInsurance = Number.parseFloat(document.getElementById("homeInsurance").value) || 0

  const monthlyIncome = annualIncome / 12
  const maxHousingPayment = monthlyIncome * 0.28 // 28% rule
  const maxTotalDebt = monthlyIncome * 0.36 // 36% rule
  const maxMortgagePayment = Math.min(maxHousingPayment, maxTotalDebt - monthlyDebts)

  const monthlyTax = propertyTax / 12
  const monthlyInsurance = homeInsurance / 12
  const availableForPI = maxMortgagePayment - monthlyTax - monthlyInsurance

  const monthlyRate = interestRate / 100 / 12
  const numberOfPayments = loanTerm * 12
  const maxLoanAmount =
    availableForPI *
    ((Math.pow(1 + monthlyRate, numberOfPayments) - 1) / (monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)))

  const maxHomePrice = maxLoanAmount + downPayment
  const comfortablePrice = maxHomePrice * 0.85 // 85% for comfort
  const dtiRatio = ((maxMortgagePayment + monthlyDebts) / monthlyIncome) * 100

  let qualification = "Good"
  if (dtiRatio > 43) qualification = "Challenging"
  else if (dtiRatio < 36) qualification = "Excellent"

  document.getElementById("maxHomePrice").textContent = formatCurrency(maxHomePrice)
  document.getElementById("monthlyPayment").textContent = formatCurrency(maxMortgagePayment)
  document.getElementById("dtiRatio").textContent = dtiRatio.toFixed(1) + "%"
  document.getElementById("comfortablePrice").textContent = formatCurrency(comfortablePrice)
  document.getElementById("loanAmount").textContent = formatCurrency(maxLoanAmount)
  document.getElementById("housingPayment").textContent = formatCurrency(maxMortgagePayment)
  document.getElementById("qualification").textContent = qualification
}

// Rent vs Buy Calculator
function calculateRentVsBuy() {
  const homePrice = Number.parseFloat(document.getElementById("homePrice").value) || 0
  const downPayment = Number.parseFloat(document.getElementById("downPayment").value) || 0
  const interestRate = Number.parseFloat(document.getElementById("interestRate").value) || 0
  const monthlyRent = Number.parseFloat(document.getElementById("monthlyRent").value) || 0
  const yearsToStay = Number.parseFloat(document.getElementById("yearsToStay").value) || 5
  const homeAppreciation = Number.parseFloat(document.getElementById("homeAppreciation").value) || 3
  const rentIncrease = Number.parseFloat(document.getElementById("rentIncrease").value) || 3

  const loanAmount = homePrice - downPayment
  const monthlyRate = interestRate / 100 / 12
  const payments = yearsToStay * 12

  const monthlyMortgage =
    (loanAmount * (monthlyRate * Math.pow(1 + monthlyRate, payments))) / (Math.pow(1 + monthlyRate, payments) - 1)
  const monthlyMaintenance = (homePrice * 0.01) / 12 // 1% annually
  const monthlyPropertyTax = (homePrice * 0.012) / 12 // 1.2% annually
  const totalMonthlyBuying = monthlyMortgage + monthlyMaintenance + monthlyPropertyTax

  // Rent calculation with annual increases
  let totalRentCost = 0
  let currentRent = monthlyRent
  for (let year = 0; year < yearsToStay; year++) {
    totalRentCost += currentRent * 12
    currentRent *= 1 + rentIncrease / 100
  }

  const totalBuyCost = totalMonthlyBuying * payments + downPayment
  const futureHomeValue = homePrice * Math.pow(1 + homeAppreciation / 100, yearsToStay)
  const equityBuilt = futureHomeValue - loanAmount
  const netBuyingCost = totalBuyCost - equityBuilt

  const costDifference = Math.abs(totalRentCost - netBuyingCost)
  const betterOption = netBuyingCost < totalRentCost ? "BUYING" : "RENTING"
  const breakEvenYear = Math.ceil(totalBuyCost / (monthlyRent * 12))

  document.getElementById("betterOption").textContent = betterOption
  document.getElementById("costDifference").textContent = formatCurrency(costDifference)
  document.getElementById("breakEvenYear").textContent = breakEvenYear + " years"
  document.getElementById("totalRentCost").textContent = formatCurrency(totalRentCost)
  document.getElementById("totalBuyCost").textContent = formatCurrency(totalBuyCost)
  document.getElementById("equityBuilt").textContent = formatCurrency(equityBuilt)
  document.getElementById("netPosition").textContent = formatCurrency(netBuyingCost)
}

// 401(k) Calculator
function calculate401k() {
  const currentAge = Number.parseInt(document.getElementById("currentAge").value) || 30
  const retirementAge = Number.parseInt(document.getElementById("retirementAge").value) || 65
  const currentBalance = Number.parseFloat(document.getElementById("currentBalance").value) || 0
  const annualSalary = Number.parseFloat(document.getElementById("annualSalary").value) || 0
  const contribution = Number.parseFloat(document.getElementById("contribution").value) || 6
  const employerMatch = Number.parseFloat(document.getElementById("employerMatch").value) || 50
  const matchLimit = Number.parseFloat(document.getElementById("matchLimit").value) || 6
  const returnRate = Number.parseFloat(document.getElementById("returnRate").value) || 8

  const yearsToRetirement = retirementAge - currentAge
  const monthlyRate = returnRate / 100 / 12
  const months = yearsToRetirement * 12

  const annualContribution = annualSalary * (contribution / 100)
  const monthlyContribution = annualContribution / 12

  const matchPercentage = Math.min(contribution, matchLimit) * (employerMatch / 100)
  const annualEmployerMatch = annualSalary * (matchPercentage / 100)
  const monthlyEmployerMatch = annualEmployerMatch / 12

  const totalMonthlyContribution = monthlyContribution + monthlyEmployerMatch

  // Future value calculation
  const fvCurrent = currentBalance * Math.pow(1 + monthlyRate, months)
  const fvContributions = totalMonthlyContribution * ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate)

  const retirementBalance = fvCurrent + fvContributions
  const totalContributions = currentBalance + monthlyContribution * months
  const employerMatchTotal = monthlyEmployerMatch * months
  const investmentGains = retirementBalance - totalContributions - employerMatchTotal

  document.getElementById("retirementBalance").textContent = formatCurrency(retirementBalance)
  document.getElementById("totalContributions").textContent = formatCurrency(totalContributions)
  document.getElementById("employerMatchTotal").textContent = formatCurrency(employerMatchTotal)
  document.getElementById("investmentGains").textContent = formatCurrency(investmentGains)
  document.getElementById("annualContribution").textContent = formatCurrency(annualContribution)
  document.getElementById("yearsToRetirement").textContent = yearsToRetirement + " years"
  document.getElementById("freeEmployerMoney").textContent = formatCurrency(employerMatchTotal)
}

// Stock Calculator
function calculateStock() {
  const purchasePrice = Number.parseFloat(document.getElementById("purchasePrice").value) || 0
  const numberOfShares = Number.parseFloat(document.getElementById("numberOfShares").value) || 0
  const currentPrice = Number.parseFloat(document.getElementById("currentPrice").value) || 0
  const dividendPerShare = Number.parseFloat(document.getElementById("dividendPerShare").value) || 0
  const holdingPeriod = Number.parseFloat(document.getElementById("holdingPeriod").value) || 0
  const dividendReinvest = document.getElementById("dividendReinvest").value
  const commissionBuy = Number.parseFloat(document.getElementById("commissionBuy").value) || 0
  const commissionSell = Number.parseFloat(document.getElementById("commissionSell").value) || 0

  const initialInvestment = purchasePrice * numberOfShares + commissionBuy
  const capitalGains = (currentPrice - purchasePrice) * numberOfShares
  const totalDividends = dividendPerShare * numberOfShares * holdingPeriod

  let finalValue = currentPrice * numberOfShares - commissionSell
  if (dividendReinvest === "yes") {
    // Simplified reinvestment calculation
    const additionalShares = totalDividends / currentPrice
    finalValue += additionalShares * currentPrice
  } else {
    finalValue += totalDividends
  }

  const totalReturn = finalValue - initialInvestment
  const returnPercent = (totalReturn / initialInvestment) * 100
  const annualizedReturn =
    holdingPeriod > 0 ? (Math.pow(finalValue / initialInvestment, 1 / holdingPeriod) - 1) * 100 : 0

  document.getElementById("totalReturn").textContent = formatCurrency(totalReturn)
  document.getElementById("returnPercent").textContent = returnPercent.toFixed(2) + "%"
  document.getElementById("annualizedReturn").textContent = annualizedReturn.toFixed(2) + "%"
  document.getElementById("capitalGains").textContent = formatCurrency(capitalGains)
  document.getElementById("totalDividends").textContent = formatCurrency(totalDividends)
  document.getElementById("initialInvestment").textContent = formatCurrency(initialInvestment)
  document.getElementById("finalValue").textContent = formatCurrency(finalValue)
}

// Salary Calculator
function calculateSalary() {
  const payType = document.getElementById("payType").value
  const hoursPerWeek = Number.parseFloat(document.getElementById("hoursPerWeek").value) || 40
  const weeksPerYear = Number.parseFloat(document.getElementById("weeksPerYear").value) || 52
  const taxRate = Number.parseFloat(document.getElementById("taxRate").value) || 25
  const benefits = Number.parseFloat(document.getElementById("benefits").value) || 0

  let annualSalary
  let hourlyRate

  if (payType === "annual") {
    annualSalary = Number.parseFloat(document.getElementById("annualSalary").value) || 0
    hourlyRate = annualSalary / (hoursPerWeek * weeksPerYear)
  } else {
    hourlyRate = Number.parseFloat(document.getElementById("hourlyWage").value) || 0
    annualSalary = hourlyRate * hoursPerWeek * weeksPerYear
  }

  const annualTaxes = annualSalary * (taxRate / 100)
  const takeHomePay = annualSalary - annualTaxes
  const monthlyGross = annualSalary / 12
  const monthlyTakeHome = takeHomePay / 12
  const totalCompensation = annualSalary + benefits

  document.getElementById("annualSalaryResult").textContent = formatCurrency(annualSalary)
  document.getElementById("hourlyRate").textContent = "$" + hourlyRate.toFixed(2)
  document.getElementById("takeHomePay").textContent = formatCurrency(takeHomePay)
  document.getElementById("monthlyGross").textContent = formatCurrency(monthlyGross)
  document.getElementById("monthlyTakeHome").textContent = formatCurrency(monthlyTakeHome)
  document.getElementById("annualTaxes").textContent = formatCurrency(annualTaxes)
  document.getElementById("totalCompensation").textContent = formatCurrency(totalCompensation)
}

// Helper function for currency formatting
function formatCurrency(amount) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount)
}
