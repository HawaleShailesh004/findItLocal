import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./Components/Home";
import BusinessListing from "./Components/BusinessListing/BusinessListing"; // Make sure the name matches your file
import Login from "./Components/Login/Login";
import Register from "./Components/Register/Register";
import BusinessDetail from "./Components/BusinessDetail/BusinessDetail";
import OwnerDashboard from "./Components/BusinessOwnerDashboard/OwnerDashboard";
import UserProfile from "./Components/UserProfile/UserProfile";
import BusinessDashboard from "./Components/BusinessDashboard/BusinessDashboard";
import BusinessListingsPage from "./Components/CategoryBusinesses/BusinessListingsPage";
import CreateBusiness from "./Components/CreateBusiness/CreateBusiness";
import CreateServicePage from "./Components/CreateService/CreateService";
import CreateService from "./Components/CreateService/CreateService";
import AboutUs from "./Components/About US/AboutUs";
import ServiceDetail from "./Components/Service Detail/ServiceDetail";
import Booking from "./Components/Booking/Booking";
import Payment from "./Components/Payment/Payment";
import ContactUs from "./Components/Contact/ContactUs";
import FAQ from "./Components/FAQ/FAQ";
import UserBookings from "./Components/UserBookings/UserBooking";


const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      {/* <Route path="/business-listings" element={<BusinessListing />} /> */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      <Route path="/business/:id" element={<BusinessDetail/>} />
      <Route path="/businessowner" element={<OwnerDashboard/>} />
      <Route path="/profile" element={<UserProfile/>} />
      <Route path="/myBookings" element={<UserBookings/>} />
      <Route path="/business-listings" element={<BusinessListing/>} />


      <Route path="/business-dashboard" element={<BusinessDashboard/>} />
      <Route path="/create-business" element={<CreateBusiness/>} />
      <Route path="/create-service" element={<CreateService/>} />
      <Route path="/business-listings/:category" element={<BusinessListingsPage/>} />

      <Route path="/about" element={<AboutUs />} />
      <Route path="/contact-us" element={<ContactUs />} />
      <Route path="/faq" element={<FAQ />} />

      <Route path="/service/:id" element={<ServiceDetail />} />

      <Route path="/book/:id" element={<Booking />} />
      <Route path="/pay" element={<Payment />} />
    </Routes>
  );
};

export default AppRouter;
