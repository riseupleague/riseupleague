export default function UI(): JSX.Element {
  return (
    <section className="container mx-auto">
      <h1 className="text-[61px] font-medium font-barlow text-center uppercase">UI Style Guide</h1>

      <hr className="my-4 border-neutral-500" />

      {/* headings */}

      <h1 className="text-[61px] font-medium font-barlow uppercase text-primary">Headings</h1>
      <div className="flex flex-col gap-2">
        <h1 className="text-[61px] font-medium font-barlow uppercase text-neutral-50">Heading H1</h1>
        <h2 className="text-[49px] font-medium font-barlow uppercase text-neutral-50">Heading H2</h2>
        <h3 className="text-[31px] font-medium font-barlow uppercase text-neutral-50">Heading H3</h3>
        <h4 className="text-2xl font-medium font-barlow uppercase text-neutral-50">Heading H4</h4>
        <h5 className="text-xl font-medium font-barlow uppercase text-neutral-50">Heading H5</h5>
        <h6 className="text-base font-medium font-barlow uppercase text-neutral-50">Heading H6</h6>
      </div>

      <hr className="my-2 border-neutral-500" />

      {/* paragraphs */}
      <h1 className="text-[61px] font-medium font-barlow uppercase text-primary">Paragraphs</h1>
      <div className="flex flex-col gap-4">
        <p className="text-sm font-barlow">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. </p>
        <p className="text-base font-barlow">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. </p>
        <p className="text-2xl font-barlow">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. </p>
      </div>

      <hr className="my-2 border-neutral-500" />

      {/* colours */}
      <h1 className="text-[61px] font-medium font-barlow uppercase text-primary">Colours</h1>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        <div className="w-full h-[150px] flex justify-center items-center border border-neutral-500 rounded bg-primary">
          <span className="text-neutral-50 text-lg font-medium uppercase">
            primary
          </span>
        </div>
        <div className="w-full h-[150px] flex justify-center items-center border border-neutral-500 rounded bg-secondary">
          <span className="text-neutral-50 text-lg font-medium uppercase">
            secondary
          </span>
        </div>
        <div className="w-full h-[150px] flex justify-center items-center border border-neutral-500 rounded bg-neutral-50">
          <span className="text-primary text-lg font-medium uppercase">
            neutral-50
          </span>
        </div>
        <div className="w-full h-[150px] flex justify-center items-center border border-neutral-500 rounded bg-neutral-100">
          <span className="text-primary text-lg font-medium uppercase">
            neutral-100
          </span>
        </div>
        <div className="w-full h-[150px] flex justify-center items-center border border-neutral-500 rounded bg-neutral-200">
          <span className="text-primary text-lg font-medium uppercase">
            neutral-200
          </span>
        </div>
        <div className="w-full h-[150px] flex justify-center items-center border border-neutral-500 rounded bg-neutral-300">
          <span className="text-primary text-lg font-medium uppercase">
            neutral-300
          </span>
        </div>
        <div className="w-full h-[150px] flex justify-center items-center border border-neutral-500 rounded bg-neutral-400">
          <span className="text-primary text-lg font-medium uppercase">
            neutral-400
          </span>
        </div>
        <div className="w-full h-[150px] flex justify-center items-center border border-neutral-500 rounded bg-neutral-500">
          <span className="text-primary text-lg font-medium uppercase">
            neutral-500
          </span>
        </div>
        <div className="w-full h-[150px] flex justify-center items-center border border-neutral-500 rounded bg-neutral-600">
          <span className="text-primary text-lg font-medium uppercase">
            neutral-600
          </span>
        </div>
        <div className="w-full h-[150px] flex justify-center items-center border border-neutral-500 rounded bg-neutral-700">
          <span className="text-primary text-lg font-medium uppercase">
            neutral-700
          </span>
        </div>
        <div className="w-full h-[150px] flex justify-center items-center border border-neutral-500 rounded bg-neutral-800">
          <span className="text-primary text-lg font-medium uppercase">
            neutral-800
          </span>
        </div>
        <div className="w-full h-[150px] flex justify-center items-center border border-neutral-500 rounded bg-neutral-900">
          <span className="text-primary text-lg font-medium uppercase">
            neutral-900
          </span>
        </div>
      </div>
    </section>
  )
}