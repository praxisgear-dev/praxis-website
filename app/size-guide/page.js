import SizeChart from "@/components/SizeChart";

export const metadata = {
  title: "Size Guide | Praxis",
  description:
    "Praxis size chart — chest, waist and hip measurements for running shorts and tees, sizes S to XXL.",
};

export default function SizeGuidePage() {
  return (
    <div className="mx-auto max-w-2xl px-5 pt-10 md:pt-16">
      <h1 className="font-serif text-3xl md:text-4xl">Size Guide</h1>
      <p className="text-sm text-muted mt-3 mb-10">
        All measurements in inches unless noted. Measure over light clothing
        for the closest match.
      </p>
      <SizeChart />
      <p className="text-sm text-muted mt-8">
        Still unsure? Message us on{" "}
        <a
          href="https://wa.me/919999999999"
          target="_blank"
          rel="noopener noreferrer"
          className="underline underline-offset-2"
        >
          WhatsApp
        </a>{" "}
        with your height and weight and we'll recommend a size.
      </p>
    </div>
  );
}
