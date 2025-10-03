'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Heart, CreditCard, Building, Users, Cross, Gift, ArrowRight } from 'lucide-react'

const donationCategories = [
  {
    title: "General Parish Fund",
    description: "Support the daily operations and maintenance of our chaplaincy",
    icon: Cross,
    suggested: [1000, 2000, 5000, 10000]
  },
  {
    title: "Building & Infrastructure",
    description: "Help us improve and expand our facilities for better worship",
    icon: Building,
    suggested: [5000, 10000, 25000, 50000]
  },
  {
    title: "Youth & Education Programs",
    description: "Support our youth ministry and educational initiatives",
    icon: Users,
    suggested: [2000, 5000, 10000, 20000]
  },
  {
    title: "Charity & Outreach",
    description: "Help us serve the less privileged in our community",
    icon: Heart,
    suggested: [1000, 3000, 5000, 15000]
  }
]

const paymentMethods = [
  {
    name: "Paystack",
    description: "Secure online payment with cards",
    icon: CreditCard,
    available: true
  },
  {
    name: "Flutterwave",
    description: "Multiple payment options available",
    icon: CreditCard,
    available: true
  },
  {
    name: "Bank Transfer",
    description: "Direct bank transfer",
    icon: Building,
    available: true
  }
]

export default function DonatePage() {
  const [selectedCategory, setSelectedCategory] = useState(donationCategories[0])
  const [amount, setAmount] = useState('')
  const [customAmount, setCustomAmount] = useState('')
  const [paymentMethod, setPaymentMethod] = useState('paystack')
  const [donorInfo, setDonorInfo] = useState({
    name: '',
    email: '',
    phone: '',
    anonymous: false
  })

  const handleAmountSelect = (selectedAmount: number) => {
    setAmount(selectedAmount.toString())
    setCustomAmount('')
  }

  const handleCustomAmount = (value: string) => {
    setCustomAmount(value)
    setAmount(value)
  }

  const handleDonate = () => {
    if (!amount || parseFloat(amount) <= 0) {
      alert('Please enter a valid donation amount')
      return
    }
    
    // Here you would integrate with actual payment processors
    alert(`Thank you for your generous donation of ₦${amount} to ${selectedCategory.title}!`)
  }

  return (
    <div className="min-h-screen bg-church-background">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-church-primary to-church-secondary py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Gift className="w-16 h-16 text-white mx-auto mb-6" />
            <h1 className="font-serif text-4xl md:text-5xl font-bold text-white mb-6">
              Support Our Mission
            </h1>
            <p className="text-white text-xl max-w-3xl mx-auto leading-relaxed">
              Your generous donations help us continue our ministry and serve our community. 
              Every contribution, no matter the size, makes a difference.
            </p>
          </motion.div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Donation Categories */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <h2 className="font-serif text-2xl font-bold text-church-text mb-6">
                Choose a Category
              </h2>
              <div className="space-y-4">
                {donationCategories.map((category, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedCategory(category)}
                    className={`w-full text-left p-4 rounded-lg border-2 transition-all ${
                      selectedCategory.title === category.title
                        ? 'border-church-primary bg-church-primary bg-opacity-10'
                        : 'border-gray-200 hover:border-church-primary'
                    }`}
                  >
                    <div className="flex items-start">
                      <category.icon className={`w-6 h-6 mr-3 mt-1 ${
                        selectedCategory.title === category.title ? 'text-church-primary' : 'text-gray-400'
                      }`} />
                      <div>
                        <h3 className="font-semibold text-church-text mb-1">{category.title}</h3>
                        <p className="text-sm text-gray-600">{category.description}</p>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Donation Form */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-white rounded-lg shadow-lg p-8"
            >
              <h2 className="font-serif text-2xl font-bold text-church-text mb-6">
                Make a Donation
              </h2>

              {/* Selected Category */}
              <div className="mb-8 p-4 bg-church-primary bg-opacity-10 rounded-lg">
                <div className="flex items-center mb-2">
                  <selectedCategory.icon className="w-5 h-5 text-church-primary mr-2" />
                  <h3 className="font-semibold text-church-text">{selectedCategory.title}</h3>
                </div>
                <p className="text-sm text-gray-600">{selectedCategory.description}</p>
              </div>

              {/* Amount Selection */}
              <div className="mb-8">
                <h3 className="font-semibold text-church-text mb-4">Select Amount (₦)</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
                  {selectedCategory.suggested.map((suggestedAmount) => (
                    <button
                      key={suggestedAmount}
                      onClick={() => handleAmountSelect(suggestedAmount)}
                      className={`p-3 rounded-lg border-2 font-medium transition-all ${
                        amount === suggestedAmount.toString()
                          ? 'border-church-primary bg-church-primary text-white'
                          : 'border-gray-200 hover:border-church-primary'
                      }`}
                    >
                      ₦{suggestedAmount.toLocaleString()}
                    </button>
                  ))}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Custom Amount
                  </label>
                  <input
                    type="number"
                    value={customAmount}
                    onChange={(e) => handleCustomAmount(e.target.value)}
                    placeholder="Enter custom amount"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-church-primary focus:border-transparent"
                  />
                </div>
              </div>

              {/* Donor Information */}
              <div className="mb-8">
                <h3 className="font-semibold text-church-text mb-4">Donor Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <input
                    type="text"
                    placeholder="Full Name"
                    value={donorInfo.name}
                    onChange={(e) => setDonorInfo({...donorInfo, name: e.target.value})}
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-church-primary focus:border-transparent"
                  />
                  <input
                    type="email"
                    placeholder="Email Address"
                    value={donorInfo.email}
                    onChange={(e) => setDonorInfo({...donorInfo, email: e.target.value})}
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-church-primary focus:border-transparent"
                  />
                </div>
                <input
                  type="tel"
                  placeholder="Phone Number"
                  value={donorInfo.phone}
                  onChange={(e) => setDonorInfo({...donorInfo, phone: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-church-primary focus:border-transparent mb-4"
                />
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={donorInfo.anonymous}
                    onChange={(e) => setDonorInfo({...donorInfo, anonymous: e.target.checked})}
                    className="mr-2"
                  />
                  <span className="text-sm text-gray-600">Make this donation anonymous</span>
                </label>
              </div>

              {/* Payment Method */}
              <div className="mb-8">
                <h3 className="font-semibold text-church-text mb-4">Payment Method</h3>
                <div className="space-y-3">
                  {paymentMethods.map((method) => (
                    <label key={method.name} className="flex items-center p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
                      <input
                        type="radio"
                        name="paymentMethod"
                        value={method.name.toLowerCase()}
                        checked={paymentMethod === method.name.toLowerCase()}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                        className="mr-3"
                      />
                      <method.icon className="w-5 h-5 text-church-primary mr-3" />
                      <div>
                        <div className="font-medium">{method.name}</div>
                        <div className="text-sm text-gray-600">{method.description}</div>
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              {/* Donate Button */}
              <button
                onClick={handleDonate}
                className="w-full bg-church-primary hover:bg-opacity-90 text-white font-semibold py-4 px-6 rounded-lg transition-colors flex items-center justify-center text-lg"
              >
                <Heart className="w-5 h-5 mr-2" />
                Donate ₦{amount ? parseFloat(amount).toLocaleString() : '0'}
                <ArrowRight className="w-5 h-5 ml-2" />
              </button>

              <p className="text-xs text-gray-500 text-center mt-4">
                Your donation is secure and will be processed safely. 
                You will receive a confirmation email after successful payment.
              </p>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Bank Details */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="text-center mb-8"
          >
            <h2 className="font-serif text-3xl font-bold text-church-text mb-4">
              Alternative Payment Methods
            </h2>
            <p className="text-gray-600">
              You can also make donations through direct bank transfer
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="font-semibold text-church-text mb-4">Bank Transfer Details</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Account Name:</span>
                  <span className="font-medium">Our Mother of Perpetual Help Chaplaincy</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Bank:</span>
                  <span className="font-medium">First Bank Nigeria</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Account Number:</span>
                  <span className="font-medium">1234567890</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Sort Code:</span>
                  <span className="font-medium">011151003</span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="font-semibold text-church-text mb-4">Mobile Money</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">MTN Mobile Money:</span>
                  <span className="font-medium">0803-XXX-XXXX</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Airtel Money:</span>
                  <span className="font-medium">0802-XXX-XXXX</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">9mobile Money:</span>
                  <span className="font-medium">0809-XXX-XXXX</span>
                </div>
              </div>
              <p className="text-xs text-gray-500 mt-4">
                Please send confirmation of payment to our email with your details.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Impact Statement */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
          >
            <h2 className="font-serif text-3xl font-bold text-church-text mb-6">
              Your Impact
            </h2>
            <p className="text-gray-600 text-lg max-w-3xl mx-auto leading-relaxed">
              Every donation helps us continue our mission of spiritual guidance, 
              community service, and pastoral care. Together, we build a stronger 
              faith community that serves God and our neighbors with love and compassion.
            </p>
            <div className="mt-8 text-center">
              <p className="text-church-primary font-medium">
                "Give, and it will be given to you. A good measure, pressed down, 
                shaken together and running over, will be poured into your lap." - Luke 6:38
              </p>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}