import { useEffect, useState } from "react";
import Select from "react-select";
import { InteractiveHoverButton } from "@/components/ui/interactive-hover-button";
import { supabase } from "@/assets/supabase-client";

const options = [
  { value: "Suggestion or feedback", label: "Suggestion or feedback" },
  { value: "I want to join or help", label: "I want to join or help" },
  { value: "I'm a service provider", label: "I'm a service provider" },
  { value: "Report a problem", label: "Report a problem" },
];

function ContactUsForm() {
  const [website, setWebsite] = useState("");
  const [user, setUser] = useState(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [selected, setSelected] = useState(null);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      setChecking(false);
    });
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });
    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    if (!user) return;
    const load = async () => {
      const { data } = await supabase
        .from("profiles")
        .select("first_name,last_name,mobile")
        .eq("user_id", user.id)
        .maybeSingle();
      if (data) {
        setName(`${data.first_name ?? ""} ${data.last_name ?? ""}`.trim());
        setMobile(data.mobile ?? "");
        setEmail(user.user_metadata.email);
        return;
      } else {
        setName(user.user_metadata.full_name);
      }
    };
    load();
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (website) {
      setSuccess(true);
      return;
    }

    if (!name || !selected || !message) {
      setError("Please fill in your name, reason and message.");
      return;
    }
    if (!email && !mobile) {
      setError("Please give an email or a phone number so we can reach you.");
      return;
    }
    if (email && !/^\S+@\S+\.\S+$/.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }
    if (message.length > 2000) {
      setError("Your message is too long (max 2000 characters).");
      return;
    }
    setLoading(true);

    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      const { error: insertError } = await supabase
        .from("contact_messages")
        .insert({
          name,
          email: email || null,
          phone: mobile || null,
          topic: selected.value,
          message,
          user_id: user?.id ?? null,
        });

      if (insertError) throw insertError;

      setSuccess(true);
    } catch (err) {
      console.error(err);
      setError("Something went wrong. Please try again in a moment.");
    } finally {
      setLoading(false);
    }
    if (success) {
      return setError("Thank you! Your message helps us improve.");
    }
  };

  if (checking) return null;

  return (
    <>
      <div className="bg-[#F9F9F9] my-15">
        <div className="py-6">
          <div className="flex justify-center">
            <div className=" max-w-7xl px-10 py-6 ">
              <section>
                <div class="grid md:grid-cols-2 items-start gap-16 mx-auto max-w-5xl">
                  <div>
                    <h2 class="text-4xl font-bold text-black tracking-tight mb-6 md:text-4xl">
                      Help us get better
                    </h2>
                    <div class="mb-12">
                      <p class="font-[montserrat] text-base leading-relaxed text-black tracking-tight">
                        Your ideas shape what we build next. Tell us what we can
                        improve, or reach out if you'd like to be part of the
                        journey.
                      </p>
                    </div>
                    <div className="hidden md:block">
                      <img
                        src="https://mwalbvphsbxuohcdlzag.supabase.co/storage/v1/object/sign/for%20big%20images/Characters_demonstrating_teamwork.jpg?token=eyJraWQiOiI0NjZmMDhjOS1mNjMyLTRkOGEtOGZjNi04MTc3NTAyZTdkYTIiLCJhbGciOiJIUzUxMiJ9.eyJ1cmwiOiJmb3IgYmlnIGltYWdlcy9DaGFyYWN0ZXJzX2RlbW9uc3RyYXRpbmdfdGVhbXdvcmsuanBnIiwic2NvcGUiOiJkb3dubG9hZCIsImlhdCI6MTc5MTM1MTE0NiwiZXhwIjoxODIyODg3MTQ2fQ.Ym0DmI_LePQiGqMrkD3HaoN1_8BZxjG1EgAyPMkI5RfOesKD9Yga7ANEbJ74P9IiCXqf1w1iVySXdlbweZE-bA"
                        alt=""
                      />
                    </div>
                  </div>
                  <form class="space-y-4">
                    <div>
                      <label
                        for="name"
                        class="mb-2 text-slate-900 text-sm font-medium inline-block"
                      >
                        Name
                      </label>
                      <input
                        value={name}
                        onChange={(e) => setName(e.target.value.trim())}
                        type="text"
                        id="name"
                        name="name"
                        placeholder="Ramika Randiv"
                        class="px-3 py-2.5 text-sm text-slate-900 w-full rounded-md bg-white outline-1 -outline-offset-1 outline-slate-300 focus:outline-2 focus:-outline-offset-2 focus:outline-black  "
                      />
                    </div>
                    <div>
                      <label
                        for="email"
                        class="mb-2 text-slate-900  font-medium text-sm inline-block"
                      >
                        Email
                      </label>
                      <input
                        value={email}
                        onChange={(e) => setEmail(e.target.value.trim())}
                        type="email"
                        id="email"
                        name="email"
                        placeholder="ramikaabeysinghe@gmail.com"
                        class="px-3 py-2.5 text-sm text-slate-900 w-full rounded-md bg-white outline-1 -outline-offset-1 outline-slate-300 focus:outline-2 focus:-outline-offset-2 focus:outline-black  "
                      />
                    </div>
                    <div>
                      <label
                        for="phone"
                        class="mb-2 text-slate-900  font-medium text-sm inline-block"
                      >
                        Phone number
                      </label>
                      <input
                        value={mobile}
                        onChange={(e) => setMobile(e.target.value.trim())}
                        type="number"
                        id="phone"
                        name="phone"
                        placeholder="0784513611"
                        class="px-3 py-2.5 text-sm text-slate-900 w-full rounded-md bg-white outline-1 -outline-offset-1 outline-slate-300 focus:outline-2 focus:-outline-offset-2 focus:outline-black  "
                      />
                    </div>
                    <div>
                      <Select
                        options={options}
                        value={selected}
                        onChange={setSelected}
                        placeholder="What are you looking for?"
                        isSearchable
                      />
                    </div>
                    <div>
                      <label
                        for="message"
                        class="mb-2 text-slate-900  font-medium text-sm inline-block"
                      >
                        Message
                      </label>
                      <textarea
                        placeholder="Write message"
                        onChange={(e) => setMessage(e.target.value.trim())}
                        rows="6"
                        type="text"
                        id="message"
                        name="message"
                        class="px-3 py-2.5 text-sm text-slate-900 w-full rounded-md bg-white outline-1 -outline-offset-1 outline-slate-300 focus:outline-2 focus:-outline-offset-2 focus:outline-black  "
                      ></textarea>
                    </div>

                    <input
                      type="text"
                      name="website"
                      value={website}
                      onChange={(e) => setWebsite(e.target.value)}
                      tabIndex={-1}
                      autoComplete="off"
                      aria-hidden="true"
                      style={{
                        position: "absolute",
                        left: "-9999px",
                        opacity: 0,
                        height: 0,
                        width: 0,
                      }}
                    />
                    <p>{error}</p>
                    <div className="flex">
                      <div className=" rounded-4xl " onClick={handleSubmit}>
                        <InteractiveHoverButton
                          hoverTextClassName={"text-white"}
                        >
                          Submit your thoughts
                        </InteractiveHoverButton>
                      </div>
                    </div>
                  </form>
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ContactUsForm;
