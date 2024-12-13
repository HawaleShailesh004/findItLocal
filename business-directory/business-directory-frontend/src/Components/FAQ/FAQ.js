import React, { useState } from "react";
import styles from "./FAQ.module.css";
import Header from "../Header";
import Footer from "../Footer";

const faqsData = [
  {
    category: "General Information",
    questions: [
      {
        question: "What is FindItLocal?",
        answer: "FindItLocal is a directory where users can find local businesses and services in their area.",
      },
      {
        question: "How do I register as a business?",
        answer: "You can register your business by navigating to the 'Register Your Business' page and filling out the form with your business details.",
      },
    ],
  },
  {
    category: "Account & Settings",
    questions: [
      {
        question: "How do I change my account password?",
        answer: "Go to your account settings, and under the 'Security' section, you'll find an option to change your password.",
      },
      {
        question: "What do I do if I forgot my password?",
        answer: "Click the 'Forgot Password' link on the login page, and follow the steps to reset your password.",
      },
    ],
  },
  {
    category: "Payments & Subscriptions",
    questions: [
      {
        question: "What payment methods are accepted?",
        answer: "We accept credit/debit cards, PayPal, Google Pay, Apple Pay, and UPI payments.",
      },
      {
        question: "How do I cancel my subscription?",
        answer: "You can cancel your subscription by going to the 'Billing' section of your account and clicking the 'Cancel Subscription' button.",
      },
    ],
  },
];

const FAQ = () => {
  const [activeQuestionIndex, setActiveQuestionIndex] = useState(null);

  const toggleAnswer = (index) => {
    setActiveQuestionIndex(activeQuestionIndex === index ? null : index);
  };

  return (
    <>
      <Header />

      <div className={styles.container}>
      <section className={styles.heroSection}>
          <img
            src={`${process.env.PUBLIC_URL}/Images/about.png`}
            alt="FAQ"
            className={styles.heroImage}
          />
          <div className={styles.overlay}></div>
          <h1 className={styles.heroTitle}>
            Frequently Asked Questions
          </h1>
        </section>

        {faqsData.map((category, catIndex) => (
          <div key={catIndex} className={styles.category}>
            <h2 className={styles.categoryTitle}>{category.category}</h2>

            {category.questions.map((faq, index) => (
              <div key={index} className={styles.faqItem}>
                <div
                  className={styles.question}
                  onClick={() => toggleAnswer(`${catIndex}-${index}`)}
                >
                  {faq.question}
                </div>

                {activeQuestionIndex === `${catIndex}-${index}` && (
                  <div className={styles.answer}>
                    <p>{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        ))}
      </div>

      <Footer />
    </>
  );
};

export default FAQ;
