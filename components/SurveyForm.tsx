'use client';
import React, { useState, useEffect } from 'react';

interface FormData {
    name: string;
    country: string;
    studyingInUS: string;
    tuitionDifficulty: string;
    smallerPayments: string;
    tuitionAmount: string;
    numberOfPayments: string;
    paymentAmount: string;
    latePaymentInterest: string;
}
  
interface Response extends FormData {}

const SurveyForm = () => {
  const [showThankYou, setShowThankYou] = useState<boolean>(false);
  const [showResponses, setShowResponses] = useState<boolean>(false);
  const [allResponses, setAllResponses] = useState<FormData[]>([]);
  const [formData, setFormData] = useState<FormData>({
    name: '',
    country: '',
    studyingInUS: '',
    tuitionDifficulty: '',
    smallerPayments: '',
    tuitionAmount: '',
    numberOfPayments: '',
    paymentAmount: '',
    latePaymentInterest: ''
  });

  const countries = [
    "Afghanistan", "Albania", "Algeria", "Andorra", "Angola", "Antigua and Barbuda", "Argentina", "Armenia", "Australia", "Austria", "Azerbaijan",
    "Bahamas", "Bahrain", "Bangladesh", "Barbados", "Belarus", "Belgium", "Belize", "Benin", "Bhutan", "Bolivia", "Bosnia and Herzegovina",
    "Botswana", "Brazil", "Brunei", "Bulgaria", "Burkina Faso", "Burundi", "Cabo Verde", "Cambodia", "Cameroon", "Canada", "Central African Republic",
    "Chad", "Chile", "China", "Colombia", "Comoros", "Congo", "Costa Rica", "Croatia", "Cuba", "Cyprus", "Czech Republic", "Denmark", "Djibouti",
    "Dominica", "Dominican Republic", "East Timor", "Ecuador", "Egypt", "El Salvador", "Equatorial Guinea", "Eritrea", "Estonia", "Eswatini",
    "Ethiopia", "Fiji", "Finland", "France", "Gabon", "Gambia", "Georgia", "Germany", "Ghana", "Greece", "Grenada", "Guatemala", "Guinea",
    "Guinea-Bissau", "Guyana", "Haiti", "Honduras", "Hungary", "Iceland", "India", "Indonesia", "Iran", "Iraq", "Ireland", "Israel", "Italy",
    "Jamaica", "Japan", "Jordan", "Kazakhstan", "Kenya", "Kiribati", "Korea, North", "Korea, South", "Kosovo", "Kuwait", "Kyrgyzstan", "Laos",
    "Latvia", "Lebanon", "Lesotho", "Liberia", "Libya", "Liechtenstein", "Lithuania", "Luxembourg", "Madagascar", "Malawi", "Malaysia", "Maldives",
    "Mali", "Malta", "Marshall Islands", "Mauritania", "Mauritius", "Mexico", "Micronesia", "Moldova", "Monaco", "Mongolia", "Montenegro",
    "Morocco", "Mozambique", "Myanmar", "Namibia", "Nauru", "Nepal", "Netherlands", "New Zealand", "Nicaragua", "Niger", "Nigeria", "North Macedonia",
    "Norway", "Oman", "Pakistan", "Palau", "Palestine", "Panama", "Papua New Guinea", "Paraguay", "Peru", "Philippines", "Poland", "Portugal",
    "Qatar", "Romania", "Russia", "Rwanda", "Saint Kitts and Nevis", "Saint Lucia", "Saint Vincent and the Grenadines", "Samoa", "San Marino",
    "Sao Tome and Principe", "Saudi Arabia", "Senegal", "Serbia", "Seychelles", "Sierra Leone", "Singapore", "Slovakia", "Slovenia",
    "Solomon Islands", "Somalia", "South Africa", "South Sudan", "Spain", "Sri Lanka", "Sudan", "Suriname", "Sweden", "Switzerland", "Syria",
    "Taiwan", "Tajikistan", "Tanzania", "Thailand", "Togo", "Tonga", "Trinidad and Tobago", "Tunisia", "Turkey", "Turkmenistan", "Tuvalu",
    "Uganda", "Ukraine", "United Arab Emirates", "United Kingdom", "United States", "Uruguay", "Uzbekistan", "Vanuatu", "Vatican City",
    "Venezuela", "Vietnam", "Yemen", "Zambia", "Zimbabwe"
  ];

  const likertScale = [
    "Strongly Agree",
    "Agree",
    "Neutral",
    "Disagree",
    "Strongly Disagree"
  ];

  useEffect(() => {
    if (formData.tuitionAmount && formData.numberOfPayments) {
      const amount = parseFloat(formData.tuitionAmount);
      const payments = parseInt(formData.numberOfPayments);
      if (!isNaN(amount) && !isNaN(payments) && payments > 0) {
        setFormData(prev => ({
          ...prev,
          paymentAmount: (amount / payments).toFixed(2)
        }));
      }
    }
  }, [formData.tuitionAmount, formData.numberOfPayments]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newResponses = [...allResponses, formData];
    setAllResponses(newResponses);
    localStorage.setItem('surveyResponses', JSON.stringify(newResponses));
    setShowThankYou(true);
  };
  
  useEffect(() => {
    const savedResponses = localStorage.getItem('surveyResponses');
    if (savedResponses) {
      setAllResponses(JSON.parse(savedResponses));
    }
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="flex justify-end mb-4">
          <button
            onClick={() => setShowResponses(!showResponses)}
            className="px-4 py-2 text-sm font-bold text-white bg-[#00B8F0] rounded-md hover:bg-[#00A8E0]"
          >
            {showResponses ? 'Back to Survey' : 'View Prior Responses'}
          </button>
        </div>
  
        {showResponses ? (
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h1 className="text-2xl font-bold text-[#00B8F0] mb-8">Survey Responses</h1>
            {allResponses.map((response, index) => (
              <div key={index} className="mb-8 p-4 border rounded">
                <h2 className="text-lg font-bold text-[#00B8F0] mb-4">Response #{index + 1}</h2>
                {Object.entries(response).map(([key, value]: [string, string]) => (
                  <div key={key} className="mb-2">
                    <span className="font-bold text-[#00B8F0]">{key}: </span>
                    <span className="text-black">{value}</span>
                  </div>
                ))}
              </div>
            ))}
          </div>
        ) : showThankYou ? (
          <div className="bg-white rounded-lg shadow-sm p-6 text-center">
            <h1 className="text-3xl font-semibold text-[#00B8F0]">Thank you!</h1>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-sm">
            <div className="px-8 py-6">
              <h1 className="text-2xl font-semibold text-[#00B8F0] mb-8">Student Survey</h1>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name Input */}
                <div className="space-y-2">
                  <label className="block text-base font-bold text-[#00B8F0]">
                    What is your name?
                  </label>
                  <input
                    type="text"
                    className="mt-1 block w-full rounded-md border border-gray-300 py-2 px-3 text-black shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                  />
                </div>
  
                {/* Country Selection */}
                <div className="space-y-2">
                  <label className="block text-base font-bold text-[#00B8F0]">
                    Where were you born?
                  </label>
                  <select
                    className="mt-1 block w-full rounded-md border border-gray-300 py-2 px-3 text-black shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    value={formData.country}
                    onChange={(e) => setFormData({...formData, country: e.target.value})}
                  >
                    <option value="">Select a country</option>
                    {countries.map((country) => (
                      <option key={country} value={country}>{country}</option>
                    ))}
                  </select>
                </div>
  
                {/* Studying in US */}
                <div className="space-y-2">
                  <label className="block text-base font-bold text-[#00B8F0]">
                    Are you studying at a university in the U.S.?
                  </label>
                  <div className="mt-2 space-x-6">
                    {['Yes', 'No'].map((option) => (
                      <label key={option} className="inline-flex items-center">
                        <input
                          type="radio"
                          className="form-radio h-4 w-4 text-blue-600"
                          name="studyingInUS"
                          value={option.toLowerCase()}
                          onChange={(e) => setFormData({...formData, studyingInUS: e.target.value})}
                        />
                        <span className="ml-2 text-black">{option}</span>
                      </label>
                    ))}
                  </div>
                </div>
  
                {/* Tuition Difficulty Rating */}
                <div className="space-y-2">
                  <label className="block text-base font-bold text-[#00B8F0]">
                    Please rate how you feel about this statement: It is difficult to pay full tuition on time
                  </label>
                  <div className="mt-2">
                    <div className="flex justify-between px-4">
                      {likertScale.map((option) => (
                        <label key={option} className="inline-flex items-center">
                          <input
                            type="radio"
                            className="form-radio h-4 w-4 text-blue-600"
                            name="tuitionDifficulty"
                            value={option}
                            onChange={(e) => setFormData({...formData, tuitionDifficulty: e.target.value})}
                          />
                          <span className="ml-2 text-black">{option}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>
  
                {/* Smaller Payments Preference */}
                <div className="space-y-2">
                  <label className="block text-base font-bold text-[#00B8F0]">
                    Would you rather pay smaller amounts of tuition more often?
                  </label>
                  <div className="mt-2 space-x-6">
                    {['Yes', 'No'].map((option) => (
                      <label key={option} className="inline-flex items-center">
                        <input
                          type="radio"
                          className="form-radio h-4 w-4 text-blue-600"
                          name="smallerPayments"
                          value={option.toLowerCase()}
                          onChange={(e) => setFormData({...formData, smallerPayments: e.target.value})}
                        />
                        <span className="ml-2 text-black">{option}</span>
                      </label>
                    ))}
                  </div>
                </div>
  
                {/* Payment Calculator */}
                <div className="space-y-4">
                  <div>
                    <label className="block text-base font-bold text-[#00B8F0]">
                      Total tuition amount per quarter
                    </label>
                    <div className="mt-1">
                      <input
                        type="number"
                        className="block w-full rounded-md border border-gray-300 py-2 px-3 text-black shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                        value={formData.tuitionAmount}
                        onChange={(e) => setFormData({...formData, tuitionAmount: e.target.value})}
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-base font-bold text-[#00B8F0]">
                      Desired number of payments
                    </label>
                    <div className="mt-1">
                      <input
                        type="number"
                        className="block w-full rounded-md border border-gray-300 py-2 px-3 text-black shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                        value={formData.numberOfPayments}
                        onChange={(e) => setFormData({...formData, numberOfPayments: e.target.value})}
                      />
                    </div>
                  </div>
  
                  <div>
                    <label className="block text-base font-bold text-[#00B8F0]">
                      Future payment amount
                    </label>
                    <div className="mt-1">
                      <input
                        type="text"
                        className="block w-full rounded-md border border-gray-300 bg-gray-50 py-2 px-3 text-black shadow-sm"
                        value={formData.paymentAmount}
                        readOnly
                      />
                    </div>
                  </div>
                </div>
  
                {/* Interest on Late Payments */}
                <div className="space-y-2">
                  <label className="block text-base font-bold text-[#00B8F0]">
                    Would you feel fair paying interest on late payments?
                  </label>
                  <div className="mt-2 space-x-6">
                    {['Yes', 'No'].map((option) => (
                      <label key={option} className="inline-flex items-center">
                        <input
                          type="radio"
                          className="form-radio h-4 w-4 text-blue-600"
                          name="latePaymentInterest"
                          value={option.toLowerCase()}
                          onChange={(e) => setFormData({...formData, latePaymentInterest: e.target.value})}
                        />
                        <span className="ml-2 text-black">{option}</span>
                      </label>
                    ))}
                  </div>
                </div>
  
                <div className="pt-4">
                  <button
                    type="submit"
                    className="w-full rounded-md border border-transparent bg-[#00B8F0] py-2 px-4 text-sm font-bold text-white shadow-sm hover:bg-[#00A8E0] focus:outline-none focus:ring-2 focus:ring-[#00B8F0] focus:ring-offset-2"
                  >
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SurveyForm;