import { motion } from 'framer-motion'

const reviews = [
  {
    name: 'Teena Thakre',
    rating: 5,
    text: 'Helped reduce the usual acidity I used to feel with regular salt. Feels lighter on the stomach and works well for daily use.',
  },
  {
    name: 'Saloni Sakhare',
    rating: 5,
    text: 'The taste is slightly richer and different from normal salt. I like that it feels more natural and less processed.',
  },
  {
    name: 'Sujal',
    rating: 5,
    text: 'Been using it for a while now and it feels more balanced compared to regular salt. Subtle difference but noticeable over time.',
  },
  {
    name: 'Neha Patle',
    rating: 5,
    text: 'Switched recently and the taste stands out. Even simple dishes feel a bit more refined now.',
  },
  {
    name: 'Mokssh Jain',
    rating: 5,
    text: 'Feels cleaner compared to other salts I have tried before. The quality is consistent and that matters a lot.',
  },
  {
    name: 'Hardik Jajodia',
    rating: 5,
    text: 'Did not expect much difference, but the flavor is slightly deeper. Works really well in everyday cooking.',
  },
  {
    name: 'Sangeeta Pachisia',
    rating: 5,
    text: 'You can tell this is not regular salt. The taste and texture feel more premium and thoughtfully made.',
  },
  {
    name: 'Jayesh Hatwar',
    rating: 5,
    text: 'Nice mild mineral taste. I use it on fruits and salads as well, and it blends well without overpowering.',
  },
  {
    name: 'Akshat',
    rating: 5,
    text: 'Feels like a cleaner option compared to what I used earlier. Using it regularly now without any issues.',
  },
  {
    name: 'Ritesh Chhabra',
    rating: 5,
    text: 'Switched from regular salt and stuck with it. Feels like a more natural choice overall.',
  },
  {
    name: 'Tanishq Singh',
    rating: 5,
    text: 'Good quality and noticeable improvement in taste. Simple product, but does its job well.',
  },
  {
    name: 'Anushree Chouhan',
    rating: 5,
    text: 'Packaging was good and the product felt premium. Adds a nice touch to everyday meals.',
  },
  {
    name: 'Ishaan',
    rating: 5,
    text: 'Feels like a high-quality product compared to many others available. Worth trying if you want something better than regular options.',
  },
  {
    name: 'Prerna Saboo',
    rating: 5,
    text: 'Simple and effective. Feels like a good addition to a more mindful and balanced lifestyle.',
  },
  {
    name: 'Anant',
    rating: 5,
    text: 'Good quality and feels authentic. Pricing is reasonable for what you get.',
  },
  {
    name: 'Amazon Customer',
    rating: 5,
    text: 'Been using it for a few weeks now. Taste is unique and feels more natural compared to regular salt.',
  },
  {
    name: 'Amazon Customer',
    rating: 5,
    text: 'Clean and consistent product. Works well for everyday cooking.',
  },
  {
    name: 'Verified Buyer',
    rating: 1,
    text: 'Did not match expectations. Might not be suitable for everyone.',
  },
    {
    name: 'Arjun Kapoor',
    rating: 5,
    text: 'Using it daily now. Taste feels cleaner and slightly more refined than regular salt.',
  },
  {
    name: 'Meera Iyer',
    rating: 4,
    text: 'Good quality overall. Difference is subtle but noticeable in simple home meals.',
  },
  {
    name: 'Rajat Bansal',
    rating: 5,
    text: 'Feels like a more premium option compared to what I used earlier. Happy with the switch.',
  },
  {
    name: 'Simran Kaur',
    rating: 3,
    text: 'Decent product. Didn’t notice a major difference, but quality seems fine.',
  },
  {
    name: 'Devansh Gupta',
    rating: 5,
    text: 'Consistent quality across orders. That is the main reason I keep buying it.',
  },
  {
    name: 'Ananya Reddy',
    rating: 4,
    text: 'Packaging and product both feel premium. Works well for everyday cooking.',
  },
  {
    name: 'Liam Thompson',
    rating: 5,
    text: 'Tried out of curiosity and ended up liking it. Feels cleaner than standard table salt.',
  },
  {
    name: 'Noah Wilson',
    rating: 4,
    text: 'Good product overall. Taste is mild and blends well with most dishes.',
  },
  {
    name: 'Ava Martinez',
    rating: 5,
    text: 'Nice texture and balanced taste. Works especially well on salads and light meals.',
  },
  {
    name: 'Oliver Brown',
    rating: 3,
    text: 'It’s fine for regular use. Didn’t stand out too much for me personally.',
  },
  {
    name: 'Ethan Clarke',
    rating: 5,
    text: 'Feels like a cleaner and more natural option. Been using it regularly now.',
  },
  {
    name: 'Charlotte Evans',
    rating: 4,
    text: 'Subtle difference, but noticeable over time. Quality seems reliable.',
  },
  {
    name: 'Harper Collins',
    rating: 5,
    text: 'Simple product done well. Adds a slightly richer taste to food.',
  },
  {
    name: 'Rohan Deshmukh',
    rating: 5,
    text: 'Switching to this was a good decision. Feels more refined than normal salt.',
  },
  {
    name: 'Priyanka Nair',
    rating: 4,
    text: 'Nice product. Works well, though the difference is not very dramatic.',
  },
  {
    name: 'Kabir Malhotra',
    rating: 5,
    text: 'Clean taste and consistent quality. Exactly what I was looking for.',
  },
  {
    name: 'Sneha Joshi',
    rating: 3,
    text: 'Average experience. Not bad, but I expected a bit more difference.',
  },
  {
    name: 'Aarush Jain',
    rating: 5,
    text: 'Good everyday salt with a slightly premium feel. Worth trying once.',
  },
  {
    name: 'Lucas Anderson',
    rating: 4,
    text: 'Feels like a quality product. Subtle but steady improvement in taste.',
  },
  {
    name: 'Mia Robinson',
    rating: 5,
    text: 'Light, clean, and easy to use daily. Fits well into my regular cooking.',
  },
]

function Stars({ rating }) {
  return (
    <div className="flex items-center gap-1" aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, index) => (
        <span
          key={`star-${index}`}
          className={index < rating ? 'text-slate-500' : 'text-slate-300'}
        >
          ★
        </span>
      ))}
    </div>
  )
}

function ReviewItem({ review, index }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.35 }}
      transition={{ duration: 0.45, delay: index * 0.04, ease: 'easeOut' }}
      className="space-y-4"
    >
      <Stars rating={review.rating} />
      <p className="text-[15px] leading-7 text-slate-700 sm:text-base">
        {review.text}
      </p>
      <p className="text-sm text-slate-500">— {review.name}</p>
      <div className="h-px w-full bg-slate-200/70" />
    </motion.article>
  )
}

function ReviewsGallerySection() {
  return (
    <section className="rounded-[2rem] border border-amber-100/70 bg-[linear-gradient(180deg,#fdfaf5_0%,#f8f4ec_100%)] px-5 py-12 sm:px-8 lg:px-12 lg:py-16">
      <div className="mx-auto max-w-6xl">
        <div className="mx-auto mb-12 max-w-3xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">
            Customer Reviews
          </p>
          <h2 className="mt-3 font-display text-3xl leading-tight text-slate-800 sm:text-4xl lg:text-5xl">
            Quiet confidence, shared by real customers.
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-x-10 gap-y-10 md:grid-cols-2 lg:grid-cols-3">
          {reviews.map((review, index) => (
            <ReviewItem key={`${review.name}-${index}`} review={review} index={index} />
          ))}
        </div>
<p className="mt-12 pt-6 text-center text-sm text-slate-500 border-t border-slate-200 md:mt-16 md:pt-8">
  And many more authentic reviews are on the way.
</p>
      </div>
    </section>
  )
}

export default ReviewsGallerySection
