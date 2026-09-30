function ContactUsForm() {
  return (
    <>
      <form action="">
        <div className="py-6">
          <h2 class="ml-6 text-3xl text-slate-900 tracking-tight mb-6 md:text-4xl">
            Contact Us
          </h2>
          <div className="flex justify-center"></div>
          <div className="flex justify-center">
            <div className=" max-w-7xl px-6 py-6 bg-[#F7F7F7]">
              <section class="">
                <div class="grid md:grid-cols-2 items-start gap-16 mx-auto max-w-5xl">
                  <div>
                    <div class="mb-12">
                      <p class="text-base leading-relaxed text-black tracking-tight">
                        Have some big idea or brand to develop and need help?
                        Then reach out we'd love to hear about your project and
                        provide help.
                      </p>
                    </div>
                    <div class="mt-12">
                      <h3 class="text-slate-900 font-semibold text-4xl">
                        Email
                      </h3>
                      <ul class="mt-4">
                        <li class="flex items-center">
                          <div class="flex items-center bg-white w-8 h-8 p-2 rounded-full">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              class="fill-current  "
                              stroke="currentColor"
                              viewBox="0 0 682.667 682.667"
                              aria-hidden="true"
                            >
                              <defs>
                                <clipPath id="a" clipPathUnits="userSpaceOnUse">
                                  <path
                                    d="M0 512h512V0H0Z"
                                    data-original="#000000"
                                  />
                                </clipPath>
                              </defs>
                              <g
                                clip-path="url(#a)"
                                transform="matrix(1.33 0 0 -1.33 0 682.667)"
                              >
                                <path
                                  fill="none"
                                  stroke-miterlimit="10"
                                  stroke-width="40"
                                  d="M452 444H60c-22.091 0-40-17.909-40-40v-39.446l212.127-157.782c14.17-10.54 33.576-10.54 47.746 0L492 364.554V404c0 22.091-17.909 40-40 40Z"
                                  data-original="#000000"
                                />
                                <path
                                  d="M472 274.9V107.999c0-11.027-8.972-20-20-20H60c-11.028 0-20 8.973-20 20V274.9L0 304.652V107.999c0-33.084 26.916-60 60-60h392c33.084 0 60 26.916 60 60v196.653Z"
                                  data-original="#000000"
                                />
                              </g>
                            </svg>
                          </div>
                          <a href="#" class="text-sm ml-4">
                            <small class="block text-slate-900 ">Mail</small>
                            <span class="font-semibold">info@lsf.lk</span>
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <form class="space-y-4">
                    <div>
                      <label
                        for="name"
                        class="mb-2 text-slate-900 text-2xl font-medium inline-block"
                      >
                        Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        placeholder="John doe"
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
                        type="email"
                        id="email"
                        name="email"
                        placeholder="john@readymadeui.com"
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
                        type="number"
                        id="phone"
                        name="phone"
                        placeholder="+11800-259-854"
                        class="px-3 py-2.5 text-sm text-slate-900 w-full rounded-md bg-white outline-1 -outline-offset-1 outline-slate-300 focus:outline-2 focus:-outline-offset-2 focus:outline-black  "
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
                        rows="6"
                        type="text"
                        id="message"
                        name="message"
                        class="px-3 py-2.5 text-sm text-slate-900 w-full rounded-md bg-white outline-1 -outline-offset-1 outline-slate-300 focus:outline-2 focus:-outline-offset-2 focus:outline-black  "
                      ></textarea>
                    </div>

                    <button
                      type="submit"
                      class="py-2.5 px-4 text-sm rounded-md font-semibold cursor-pointer text-white border border-black bg-black hover:bg-blue-700 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-black"
                    >
                      Send message
                    </button>
                  </form>
                </div>
              </section>
            </div>
          </div>
        </div>
      </form>
    </>
  );
}

export default ContactUsForm;
