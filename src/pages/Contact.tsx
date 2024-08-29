// import React, { useState } from "react";
// import { motion } from "framer-motion";
// import Topnav from "@/components/shared/topnav";
// import { MapPin, Phone, Mail, MessageCircle, Send } from "lucide-react";
// import { Input } from "@/components/ui/input";
// import { Textarea } from "@/components/ui/textarea";
// import { Button } from "@/components/ui/button";
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";

// const fadeInUp = {
//   hidden: { opacity: 0, y: 20 },
//   visible: { opacity: 1, y: 0 },
// };

// const staggerChildren = {
//   visible: {
//     transition: {
//       staggerChildren: 0.1,
//     },
//   },
// };

// const ContactCard = ({
//   icon: Icon,
//   title,
//   content,
// }: {
//   icon: React.ElementType;
//   title: string;
//   content: string;
// }) => (
//   <Card className="w-full">
//     <CardHeader>
//       <CardTitle className="flex items-center">
//         <Icon className="mr-2 h-6 w-6" />
//         {title}
//       </CardTitle>
//     </CardHeader>
//     <CardContent>
//       <p>{content}</p>
//     </CardContent>
//   </Card>
// );

// const ContactForm = () => {
//   const [formState, setFormState] = useState({
//     name: "",
//     email: "",
//     message: "",
//   });

//   const handleChange = (
//     e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
//   ) => {
//     setFormState({
//       ...formState,
//       [e.target.name]: e.target.value,
//     });
//   };

//   const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     // Here you would typically handle form submission, e.g., send data to an API
//     console.log("Form submitted:", formState);
//     // Reset form after submission
//     setFormState({ name: "", email: "", message: "" });
//   };

//   return (
//     <form onSubmit={handleSubmit} className="space-y-4">
//       <Input
//         placeholder="Your Name"
//         name="name"
//         value={formState.name}
//         onChange={handleChange}
//         required
//       />
//       <Input
//         type="email"
//         placeholder="Your Email"
//         name="email"
//         value={formState.email}
//         onChange={handleChange}
//         required
//       />
//       <Textarea
//         placeholder="Your Message"
//         name="message"
//         value={formState.message}
//         onChange={handleChange}
//         required
//       />
//       <Button type="submit" className="w-full">
//         Send Message
//         <Send className="ml-2 h-4 w-4" />
//       </Button>
//     </form>
//   );
// };

// const Contact = () => {
//   const contactInfo = [
//     {
//       icon: MapPin,
//       title: "Our Location",
//       content: "123 Delivery Street, Cityville, State 12345",
//     },
//     {
//       icon: Phone,
//       title: "Phone Number",
//       content: "+1 (555) 123-4567",
//     },
//     {
//       icon: Mail,
//       title: "Email Address",
//       content: "contact@deliveryservice.com",
//     },
//     {
//       icon: MessageCircle,
//       title: "Live Chat",
//       content: "Available 24/7 on our website and mobile app",
//     },
//   ];

//   return (
//     <div className="flex w-full flex-col min-h-screen bg-gray-100">
//       <Topnav />
//       <main className="flex-grow">
//         <motion.section
//           initial="hidden"
//           whileInView="visible"
//           viewport={{ once: true, amount: 0.5 }}
//           variants={fadeInUp}
//           className="mb-12 px-4 py-16 bg-blue-600 text-white text-center"
//         >
//           <h1 className="text-4xl font-bold mb-4">Contact Us</h1>
//           <p className="text-xl max-w-2xl mx-auto">
//             We're here to help! Reach out to us through any of the following
//             methods.
//           </p>
//         </motion.section>

//         <motion.section
//           initial="hidden"
//           whileInView="visible"
//           viewport={{ once: true, amount: 0.5 }}
//           variants={staggerChildren}
//           className="mb-12 px-4"
//         >
//           <motion.div
//             variants={staggerChildren}
//             className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto"
//           >
//             {contactInfo.map((info, index) => (
//               <motion.div key={index} variants={fadeInUp}>
//                 <ContactCard {...info} />
//               </motion.div>
//             ))}
//           </motion.div>
//         </motion.section>

//         <motion.section
//           initial="hidden"
//           whileInView="visible"
//           viewport={{ once: true, amount: 0.5 }}
//           variants={fadeInUp}
//           className="mb-12 px-4 py-16 bg-white"
//         >
//           <div className="max-w-2xl mx-auto">
//             <h2 className="text-2xl font-semibold mb-6 text-center">
//               Send Us a Message
//             </h2>
//             <Card>
//               <CardHeader>
//                 <CardTitle>Contact Form</CardTitle>
//                 <CardDescription>
//                   Fill out the form below and we'll get back to you as soon as
//                   possible.
//                 </CardDescription>
//               </CardHeader>
//               <CardContent>
//                 <ContactForm />
//               </CardContent>
//             </Card>
//           </div>
//         </motion.section>

//         <motion.section
//           initial="hidden"
//           whileInView="visible"
//           viewport={{ once: true, amount: 0.5 }}
//           variants={fadeInUp}
//           className="mb-12 px-4 py-16 bg-blue-100"
//         >
//           <div className="max-w-4xl mx-auto text-center">
//             <h2 className="text-2xl font-semibold mb-6">Find Us On The Map</h2>
//             <div className="aspect-w-16 aspect-h-9">
//               <img
//                 src="/api/placeholder/800/450"
//                 alt="Map location"
//                 className="rounded-lg shadow-lg object-cover"
//               />
//             </div>
//             <p className="mt-4 text-gray-600">
//               Visit our main office at 123 Delivery Street, Cityville, State
//               12345
//             </p>
//           </div>
//         </motion.section>
//       </main>
//     </div>
//   );
// };

// export default Contact;

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Topnav from "@/components/shared/topnav";
import { MapPin, Phone, Mail, MessageCircle, Send, Check } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const staggerChildren = {
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const ContactCard = ({
  icon: Icon,
  title,
  content,
}: {
  icon: React.ElementType;
  title: string;
  content: string;
}) => (
  <motion.div
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    className="w-full"
  >
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="flex items-center">
          <Icon className="mr-2 h-6 w-6 text-blue-500" />
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p>{content}</p>
      </CardContent>
    </Card>
  </motion.div>
);

const ContactForm = () => {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Here you would typically handle form submission, e.g., send data to an API
    console.log("Form submitted:", formState);
    // Show success message
    setIsSubmitted(true);
    // Reset form after submission
    setTimeout(() => {
      setFormState({ name: "", email: "", message: "" });
      setIsSubmitted(false);
    }, 3000);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        placeholder="Your Name"
        name="name"
        value={formState.name}
        onChange={handleChange}
        required
      />
      <Input
        type="email"
        placeholder="Your Email"
        name="email"
        value={formState.email}
        onChange={handleChange}
        required
      />
      <Textarea
        placeholder="Your Message"
        name="message"
        value={formState.message}
        onChange={handleChange}
        required
      />
      <AnimatePresence>
        {isSubmitted ? (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="bg-green-100 text-green-700 p-3 rounded-md flex items-center"
          >
            <Check className="mr-2" /> Message sent successfully!
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
          >
            <Button type="submit" className="w-full">
              Send Message
              <Send className="ml-2 h-4 w-4" />
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </form>
  );
};

const FAQSection = () => {
  const faqs = [
    {
      question: "What are your delivery hours?",
      answer:
        "We offer delivery services 24/7, ensuring you can get what you need at any time of the day or night.",
    },
    {
      question: "How can I track my order?",
      answer:
        "You can track your order in real-time through our mobile app or website. Simply enter your order number to see its current status and estimated delivery time.",
    },
    {
      question: "What's your refund policy?",
      answer:
        "We offer a full refund if you're not satisfied with your order. Please contact our customer support within 24 hours of receiving your order to initiate the refund process.",
    },
  ];

  return (
    <Accordion type="single" collapsible className="w-full">
      {faqs.map((faq, index) => (
        <AccordionItem key={index} value={`item-${index}`}>
          <AccordionTrigger>{faq.question}</AccordionTrigger>
          <AccordionContent>{faq.answer}</AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
};

const Contact = () => {
  const contactInfo = [
    {
      icon: MapPin,
      title: "Our Location",
      content: "123 Delivery Street, Cityville, State 12345",
    },
    {
      icon: Phone,
      title: "Phone Number",
      content: "+1 (555) 123-4567",
    },
    {
      icon: Mail,
      title: "Email Address",
      content: "contact@deliveryservice.com",
    },
    {
      icon: MessageCircle,
      title: "Live Chat",
      content: "Available 24/7 on our website and mobile app",
    },
  ];

  return (
    <div className="flex w-full flex-col min-h-screen bg-gray-100">
      <Topnav />
      <main className="flex-grow">
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          variants={fadeInUp}
          className="mb-12 px-4 py-16 bg-blue-600 text-white text-center relative overflow-hidden"
        >
          <motion.div
            className="absolute inset-0 opacity-10"
            animate={{
              backgroundPosition: ["0% 0%", "100% 100%"],
            }}
            transition={{
              duration: 20,
              ease: "linear",
              repeat: Infinity,
              repeatType: "reverse",
            }}
            style={{
              backgroundImage:
                'url(\'data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.4"%3E%3Cpath d="M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\')',
            }}
          />
          <div className="relative z-10">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Contact Us</h1>
            <p className="text-xl max-w-2xl mx-auto">
              We're here to help! Reach out to us through any of the following
              methods.
            </p>
          </div>
        </motion.section>

        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          variants={staggerChildren}
          className="mb-12 px-4"
        >
          <motion.div
            variants={staggerChildren}
            className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto"
          >
            {contactInfo.map((info, index) => (
              <motion.div key={index} variants={fadeInUp}>
                <ContactCard {...info} />
              </motion.div>
            ))}
          </motion.div>
        </motion.section>

        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          variants={fadeInUp}
          className="mb-12 px-4 py-16 bg-white"
        >
          <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8">
            <div>
              <h2 className="text-2xl font-semibold mb-6">Send Us a Message</h2>
              <Card>
                <CardHeader>
                  <CardTitle>Contact Form</CardTitle>
                  <CardDescription>
                    Fill out the form below and we'll get back to you as soon as
                    possible.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ContactForm />
                </CardContent>
              </Card>
            </div>
            <div>
              <h2 className="text-2xl font-semibold mb-6">
                Frequently Asked Questions
              </h2>
              <FAQSection />
            </div>
          </div>
        </motion.section>

        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          variants={fadeInUp}
          className="mb-12 px-4 py-16 bg-blue-100"
        >
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-2xl font-semibold mb-6">Find Us On The Map</h2>
            <div className="aspect-w-16 aspect-h-9">
              <img
                src="/api/placeholder/800/450"
                alt="Map location"
                className="rounded-lg shadow-lg object-cover w-full h-full"
              />
            </div>
            <p className="mt-4 text-gray-600">
              Visit our main office at 123 Delivery Street, Cityville, State
              12345
            </p>
          </div>
        </motion.section>
      </main>
    </div>
  );
};

export default Contact;
