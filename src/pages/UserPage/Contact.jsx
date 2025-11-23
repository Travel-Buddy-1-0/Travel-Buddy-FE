import { Phone, Printer, Envelope } from "phosphor-react";

export default function Contact() {
  return (
    <div className="w-full min-h-full flex flex-col lg:flex-row">
      {/* Left side: Form */}
      <div className="w-full lg:w-1/2 xl:w-2/5 p-6 md:p-12 flex items-center justify-center">
        <div className="w-full max-w-md">
          <div className="font-bold text-3xl lg:text-4xl mb-4">
            Get in <span className="text-[#00BCD4]">Touch</span>
          </div>
          <div className="font-semibold text-sm text-gray-600 mb-8">
            Enim tempor eget pharetra facilisis sed maecenas adipiscing. Eu leo molestie vel, ornare non id blandit netus.
          </div>
          <form className="space-y-5">
            <input
              className="block w-full border border-gray-300 px-4 py-3 rounded-lg focus:outline-[#00BCD4]"
              placeholder="Name"
            />
            <input
              className="block w-full border border-gray-300 px-4 py-3 rounded-lg focus:outline-[#00BCD4]"
              placeholder="Email"
            />
            <input
              className="block w-full border border-gray-300 px-4 py-3 rounded-lg focus:outline-[#00BCD4]"
              placeholder="Phone Number"
            />
            <select className="block w-full border border-gray-300 px-4 py-3 rounded-lg focus:outline-[#00BCD4]">
              <option value="">How did you find us?</option>
              <option value="saab">Saab</option>
              <option value="opel">Opel</option>
              <option value="audi">Audi</option>
            </select>
            <button className="block w-full bg-[#00BCD4] font-bold px-3 py-3 rounded-lg text-center uppercase text-white hover:bg-[#0097a7] transition">
              Send
            </button>
          </form>

          {/* Info section */}
          <div className="mt-10 flex flex-col sm:flex-row flex-wrap gap-6 sm:gap-8">
            <div className="flex items-center">
              <Phone size={20} weight="bold" className="mr-3 text-[#00BCD4]" />
              <div>
                <div className="font-semibold uppercase text-xs">Phone</div>
                <div className="text-red-400 text-sm">0354231234</div>
              </div>
            </div>
            <div className="flex items-center">
              <Printer size={20} weight="bold" className="mr-3 text-[#00BCD4]" />
              <div>
                <div className="font-semibold uppercase text-xs">Fax</div>
                <div className="text-red-400 text-sm">0354231234</div>
              </div>
            </div>
            <div className="flex items-center">
              <Envelope size={20} weight="bold" className="mr-3 text-[#00BCD4]" />
              <div>
                <div className="font-semibold uppercase text-xs">Email</div>
                <div className="text-red-400 text-sm">fptudn@fpt.edu.vn</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right side: Map */}
      <div className="w-full lg:w-1/2 xl:w-3/5 h-64 lg:h-auto bg-[#183A4A] p-4 lg:p-8">
        <iframe
          className="w-full h-full rounded-2xl"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3835.8561681211795!2d108.2583163749018!3d15.968885884696123!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3142116949840599%3A0x365b35580f52e8d5!2sFPT%20University%20Danang!5e0!3m2!1sen!2s!4v1757478644483!5m2!1sen!2s"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
    </div>
  );
}