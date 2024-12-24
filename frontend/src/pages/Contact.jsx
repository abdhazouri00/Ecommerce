import React from "react";
import Title from "./../components/Title";
import { assets } from "../assets/frontend_assets/assets";
import { Button, Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { useState } from "react";
import Subscribe from "./../components/Subscribe";

const Contact = () => {
  let [isOpen, setIsOpen] = useState(false);

  function open() {
    setIsOpen(true);
  }

  function close() {
    setIsOpen(false);
  }

  return (
    <div>
      <div className="text-2xl text-center pt-10 border-t">
        <Title text1={"CONTACT"} text2={"US"} />
      </div>

      <div className="flex flex-col sm:flex-row my-10 justify-center gap-10 mb-28">
        <img className="w-full md:max-w-[480px]" src={assets.contact_img} />
        <div className="flex flex-col justify-center items-start gap-6 sm:min-w-[480px]">
          <p className="font-semibold text-xl text-gray-600">Our Store</p>
          <p className="text-gray-500">Pendik ; Istanbul</p>
          <p className="text-gray-500">
            Tel: +90 531 012 47 16 <br /> Email: abdhazouritr@gmail.com
          </p>
          <p className="font-semibold text-xl text-gray-600">Request Quota</p>
          <p className="text-gray-500">support@hazuri.com.tr</p>

          <div className="flex flex-col gap-4 w-full sm:max-w-[480px]">
            <div className="flex gap-3">
              <input
                className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
                type="text"
                placeholder="Name"
              />
            </div>

            <div className="flex gap-3">
              <input
                className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
                type="email"
                placeholder="Email"
              />
            </div>

            <div className="flex gap-3">
              <input
                className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
                type="text"
                placeholder="Subject"
              />
            </div>

            <div className="flex gap-3">
              <textarea
                className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
                placeholder="Email Content"
              />
            </div>

            <button
              className="bg-black text-white text-sm px-8 py-3"
              onClick={open}
            >
              Send Email
            </button>
          </div>

          <Dialog
            open={isOpen}
            as="div"
            className="relative z-10 focus:outline-none"
            onClose={close}
          >
            {/* Blurred Background */}
            <div className="fixed inset-0 z-0 bg-black/30 backdrop-blur-sm" />

            {/* Modal Content */}
            <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
              <div className="flex min-h-full items-center justify-center p-4">
                <DialogPanel
                  transition
                  className="w-full max-w-md rounded-xl bg-gray-200 p-6 backdrop-blur-2xl duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0"
                >
                  <DialogTitle
                    as="h3"
                    className="text-base/7 font-medium text-black"
                  >
                    Email Sent!
                  </DialogTitle>
                  <p className="mt-2 text-sm/6 text-black">
                    Your email has been successfully sent. We will reply to you
                    as soon as possible.
                  </p>
                  <div className="mt-4">
                    <Button
                      className="inline-flex items-center gap-2 rounded-md bg-black py-1.5 px-3 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-gray-600 data-[focus]:outline-1 data-[focus]:outline-white data-[open]:bg-gray-700"
                      onClick={close}
                    >
                      Got it, thanks!
                    </Button>
                  </div>
                </DialogPanel>
              </div>
            </div>
          </Dialog>
        </div>
      </div>
      <Subscribe />
    </div>
  );
};

export default Contact;
