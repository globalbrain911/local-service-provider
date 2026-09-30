function Security() {
  return (
    <>
      <div className="max-w-200 pl-10 pt-10">
        <div className="text-3xl font-bold">Security</div>
        <div className="text-xl py-5 font-bold tracking-wide">
          Logging in to LSF
        </div>
        <div className="pr-5">
          <div className="">
            <div className="text-lg">Password</div>
            <div className="pr-1 py-3">
              <input
                className="border-none bg-slate-200 p-3 px-4 w-full rounded-lg selection:border-black selection:border-2"
                type="text"
                placeholder="*****************"
              />
            </div>
          </div>
          <div>
            <div>2-step verification</div>
            <div className="py-2 text-sm text-mist-600">
              Add additional security to your account with 2-step verification
            </div>
          </div>
          <div>
            <div>Recovery email</div>
            <div className="py-3">
              <input
                className="border-none bg-slate-200 p-3 px-4 w-full rounded-lg selection:border-black selection:border-2"
                type="text"
                placeholder="ramikaabeysinghe@gmail.com"
              />
            </div>
          </div>
          <div className="pr-3 py-3">
            <div className="text-lg cursor-pointer rounded-lg bg-black text-white w-full p-3 flex justify-center items-center">
              Update
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Security;
