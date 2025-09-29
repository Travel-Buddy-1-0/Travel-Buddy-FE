import { Phone, Printer, Envelope } from "phosphor-react";

export default function Contact() {
  return (
    <div className="flex justify-between">
      <div className="flex flex-col text-left px-10 py-8 w-full lg:w-2/5 bg-white rounded-2xl shadow-md h-4/5 mt-12 ml-12">
        <div className="font-bold text-3xl lg:text-3xl flex flex-wrap">
          Get in <span className="text-[#00BCD4] ml-2">Touch</span>
        </div>
        <div className="font-semibold text-sm mt-5 mb-10 text-gray-600">
          Enim tempor eget pharetra facilisis sed maecenas adipiscing. Eu leo molestie vel, ornare non id blandit netus.
        </div>
        <form className="space-y-5">
          <input
            className="block w-full border border-gray-300 px-3 py-2 rounded focus:outline-[#00BCD4]"
            placeholder="Name"
          />
          <input
            className="block w-full border border-gray-300 px-3 py-2 rounded focus:outline-[#00BCD4]"
            placeholder="Email"
          />
          <input
            className="block w-full border border-gray-300 px-3 py-2 rounded focus:outline-[#00BCD4]"
            placeholder="Phone Number"
          />
          <select className="block w-full border border-gray-300 px-3 py-2 rounded focus:outline-[#00BCD4]">
            <option value="">How did you find us?</option>
            <option value="saab">Saab</option>
            <option value="opel">Opel</option>
            <option value="audi">Audi</option>
          </select>
          <button className="block w-full bg-[#00BCD4] font-bold px-3 py-2 rounded text-center uppercase text-white hover:bg-[#0097a7] transition">
            Send
          </button>
        </form>

        {/* Info dưới form */}
        <div className="mt-10 flex flex-wrap gap-8">
          <div className="items-center flex">
            <Phone size={16} weight="bold" className="mr-4 text-[#00BCD4]" />
            <div className="flex flex-col">
              <div className="font-semibold uppercase text-xs">Phone</div>
              <div className="text-red-400 text-xs">0354231234</div>
            </div>
          </div>
          <div className="items-center flex">
            <Printer size={16} weight="bold" className="mr-4 text-[#00BCD4]" />
            <div className="flex flex-col">
              <div className="font-semibold uppercase text-xs">Fax</div>
              <div className="text-red-400 text-xs">0354231234</div>
            </div>
          </div>
          <div className="items-center flex">
            <Envelope size={16} weight="bold" className="mr-4 text-[#00BCD4]" />
            <div className="flex flex-col">
              <div className="font-semibold uppercase text-xs">Email</div>
              <div className="text-red-400 text-xs">fptudn@fpt.edu.vn</div>
            </div>
          </div>
        </div>
      </div>

      {/* Google Maps */}
      <div>
        <iframe
          className="relative top-12 left-20 h-4/5"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3835.8561681211795!2d108.2583163749018!3d15.968885884696123!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3142116949840599%3A0x365b35580f52e8d5!2sFPT%20University%20Danang!5e0!3m2!1sen!2s!4v1757478644483!5m2!1sen!2s"
          width="400"
          height="300"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>

      {/* Background màu */}
      <div className="h-screen bg-[#183A4A] block mr-10 w-[400px]"></div>
    </div>
  );
}
