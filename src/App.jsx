  import { BrowserRouter, Routes, Route } from "react-router-dom";
  import Home from "./pages/UserPage/Home";
  import { LayoutDefault } from "./pages/UserPage/LayoutUser";
  import Login from "./pages/Authen/Login";
  import LayoutAuthen from "./pages/Authen/LayoutAuthen";
  import './index.css';
  import './App.css';
  import TravelerRegister from "./pages/Authen/TravelerRegister";
  // import BussinessRegister from "./pages/Authen/BussinessRegister";
  import ForgetPassword from "./pages/Authen/ForgetPassword";
  import VerifyEmail from "./pages/Authen/VerifyEmail";
  import Contact from "./pages/UserPage/Contact";
  import BookingHotel from "./pages/Bookings/BookingHotel";
  import PhotoDetail from "./pages/UserPage/ProductDetails";
  import BussinessRegister from "./pages/Authen/BussinessRegister";
  import { HotelDetail } from "./pages/UserPage/HotelDetail";
  import Bookingsconfirmation from "./components/Bookings/Bookingsconfirmation";
  import BookingCheckout from "./components/Bookings/BookingCheckout";
  import BookingSuccess from "./components/Bookings/BookingSuccess";
import { AccountMenu } from "./pages/UserPage/AccountMenuLayout";
import MyAccount from "./components/AccountMenu/MyAccount";
import Success from "./pages/Authen/SuccesVerifyEmail";
import GoogleCallback from "./pages/Authen/GoogleCallback";
import MyBookings from "./components/AccountMenu/Mybooking";
import MySettingNotification from "./components/AccountMenu/MySettingNotification";
import MyCard from "./components/AccountMenu/MyCard";
import MySaves from "./components/AccountMenu/MySaves";
import BookingFailed from "./components/Bookings/BookingsFaild";
import ErrorPage from "./components/Layout/ErrorPage";
import PaymentSuccess from "./components/Payments/PaymentSuccess";
import PaymentCancel from "./components/Payments/PaymentCancel";





  function App() {
    return (
   <BrowserRouter>
  <Routes>
    {/* Layout chính cho User */}
    <Route element={<LayoutDefault />}>
      <Route index element={<Home />} />
      <Route path="contact" element={<Contact />} />
      <Route path="booking/hotel" element={<BookingHotel />} />
      <Route path="booking/hotel/:id" element={<HotelDetail />} />
      <Route path="booking/confirmation" element={<Bookingsconfirmation />} />
      <Route path="booking/checkout" element={<BookingCheckout />} />
      <Route path="booking/success" element={<BookingSuccess />} />


       <Route path="/payment-success" element={<PaymentSuccess />} />
        <Route path="/payment-cancel" element={<PaymentCancel />} />

        
      <Route path="booking/failed" element={<BookingFailed/>}></Route>
   <Route path="travel/posts/:id" element={<Home />} />
      <Route path="user" element={<AccountMenu />}>
        <Route path="MyAccount" element={<MyAccount />} />
        
          <Route path="MyBooking" element={<MyBookings />} />
           <Route path="MyCards" element={<MyCard />} />
             <Route path="Saved" element={<MySaves />} />
          <Route path="Notifications" element={<MySettingNotification/>}/>
      </Route>
    </Route>
      <Route path="ErrorPage" element={<ErrorPage/>} />

    {/* Layout dành cho login/register */}
    <Route element={<LayoutAuthen />}>
      <Route path="login" element={<Login />} />
      <Route path="register" element={<TravelerRegister />} />
      <Route path="bussinessRegister" element={<BussinessRegister />} />
      <Route path="forgetPassword" element={<ForgetPassword />} />
      <Route path="verifyEmail" element={<VerifyEmail />} />
      <Route path="success" element={<Success />} />
      <Route path="Authentication/oauth-callback" element={<GoogleCallback />} />
    </Route>
  </Routes>

</BrowserRouter>

    );
  }

  export default App;
