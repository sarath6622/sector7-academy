export interface FAQItem {
  question: string;
  answer: string;
}

/** NOTE(user): refine answers with the academy's final policies. */
export const FAQS: FAQItem[] = [
  {
    question: "Is S7 Academy accredited?",
    answer:
      "Accreditation is currently in progress. We are pursuing affiliation with REPS India and Skill India / NSDC. We'll update this page and notify enrolled students as each accreditation is confirmed.",
  },
  {
    question: "Do I need prior experience or qualifications to join?",
    answer:
      "It depends on the course. Our Level 1 Foundation course is open to motivated beginners (16+). Higher levels expect completion of the previous level or equivalent experience.",
  },
  {
    question: "How are the courses delivered?",
    answer:
      "Courses are in-person and batch-based, with hands-on coaching practice on a live, fully operational commercial gym floor at Sector 7 — you learn where you'll work.",
  },
  {
    question: "How much do the courses cost?",
    answer:
      "Course fees are shared on enquiry. Submit an application for the course you're interested in and our team will get back to you with full details, batch dates, and fees.",
  },
  {
    question: "Do you help with jobs and placements?",
    answer:
      "Yes. We provide career and placement support — including help with interviews and placements, plus ongoing community and alumni support for graduates.",
  },
  {
    question: "How do I enroll?",
    answer:
      "Submit an application through our Apply page. Our team will contact you to confirm eligibility, batch availability, and complete enrollment.",
  },
];
