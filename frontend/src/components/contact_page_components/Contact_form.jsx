import {
  Card,
  Input,
  Button,
  Typography,
  Textarea,
} from "@material-tailwind/react";
import { useForm } from "react-hook-form";
import { ToastContainer, toast, Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Contact_form() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  async function onSubmit(data) {
    // console.log("form data", data);

    try {
      const response = await fetch(
        "http://localhost:5000/contact/submit-contact",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );
      // const responseData = response.json();
      // console.log("response data", responseData);
      if (response.ok) {
        // alert("form submitted successfully");
        toast.success(
          "Form Submitted Successfully, Our Team Will Contact You Soon",
          {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            transition: Slide,
          }
        );
        reset();
      } else {
        alert("failed to submit form");
        toast.error("Something Went Wrong , Please Try Again Later", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        reset();
      }
      // console.log(response.body);
    } catch (err) {
      console.error("Error submitting form:", err);
    }
  }
  return (
    <>
      <section className="bg-contact_bg_img px-4 py-8 w-full h-auto bg-cover bg-no-repeat flex items-center md:justify-center lg:justify-start">
        <Card
          shadow={false}
          className="md:w-[600px] p-5 flex items-center justify-center"
        >
          <Typography variant="h4" className="text-primary font-font-primary">
            Contact Us
          </Typography>
          <Typography
            color="gray"
            className="mt-1 font-normal font-font-primary tracking-widest text-black"
          >
            We'd love to hear from you! Fill in your details below.
          </Typography>
          <form
            className="mt-8 mb-2 !w-full sm:w-96"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="mb-4 flex flex-col gap-6">
              <Typography variant="h6" className="-mb-3 font-font-primary">
                Your Name
              </Typography>
              <Input
                {...register("name", { required: true, maxLength: 20 })}
                size="lg"
                name="name"
                placeholder="John Doe"
                className="!border-t-blue-gray-200 focus:!border-t-gray-900 !w-full !font-font-primary placeholder:font-font-primary text-xl"
                labelProps={{
                  className: "before:content-none after:content-none",
                }}
              />
              {errors.name && (
                <span className="font-font-primary text-red-300">
                  Name field is required
                </span>
              )}

              <Typography variant="h6" className="-mb-3 font-font-primary">
                Phone Number
              </Typography>
              <Input
                {...register("mobile", {
                  required: true,
                  maxLength: 20,
                  minLength: 10,
                })}
                name="mobile"
                size="lg"
                placeholder="+1 234 567 890"
                className="!border-t-blue-gray-200 focus:!border-t-gray-900 !font-font-primary placeholder:font-font-primary text-xl"
                labelProps={{
                  className: "before:content-none after:content-none",
                }}
              />
              {errors.mobile && (
                <span className="font-font-primary text-red-300">
                  Mobile field is required
                </span>
              )}

              <Typography variant="h6" className="-mb-3 font-font-primary">
                Email Address
              </Typography>
              <Input
                {...register("email", {
                  required: true,
                })}
                name="email"
                size="lg"
                type="email"
                placeholder="name@mail.com"
                className="!border-t-blue-gray-200 focus:!border-t-gray-900 placeholder:font-font-primary !font-font-primary text-xl"
                labelProps={{
                  className: "before:content-none after:content-none",
                }}
              />
              {errors.email && (
                <span className="font-font-primary text-red-300">
                  Email field is required
                </span>
              )}

              <Typography variant="h6" className="-mb-3 font-font-primary">
                Subject
              </Typography>
              <Input
                {...register("subject", {
                  required: true,
                })}
                name="subject"
                size="lg"
                placeholder="Subject of your message"
                className="!border-t-blue-gray-200 focus:!border-t-gray-900 placeholder:font-font-primary !font-font-primary text-xl"
                labelProps={{
                  className: "before:content-none after:content-none",
                }}
              />
              {errors.subject && (
                <span className="font-font-primary text-red-300">
                  Subject field is required
                </span>
              )}

              <Typography variant="h6" className="-mb-3 font-font-primary">
                Message
              </Typography>
              <Textarea
                {...register("message", {
                  required: true,
                })}
                name="message"
                size="lg"
                placeholder="Your message here..."
                className="!border-t-blue-gray-200 focus:!border-t-gray-900 placeholder:!font-font-primary !font-font-primary text-xl"
              />
              {errors.message && (
                <span className="font-font-primary text-red-300">
                  Message field is required
                </span>
              )}
            </div>
            <Button
              type="submit"
              className="mt-6 bg-primary text-xl font-bold font-font-primary"
              fullWidth
            >
              Submit
            </Button>
          </form>
        </Card>
      </section>
      {/* map starts */}
      <section className="px-8 py-8">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d9582266.675108021!2d-15.02031784273553!3d54.10174790867405!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x25a3b1142c791a9%3A0xc4f8a0433288257a!2sUnited%20Kingdom!5e0!3m2!1sen!2sin!4v1732085911070!5m2!1sen!2sin"
          className="rounded-md"
          width="600"
          height="450"
          style={{ border: 0, width: "100%" }}
          allowfullscreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </section>
      {/* // map ends */}
    </>
  );
}
