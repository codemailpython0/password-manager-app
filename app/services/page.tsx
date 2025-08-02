// export default function ServicesPage() {
//   return (
//     <div className="p-10 text-center">
//       <h1 className="text-4xl font-bold mb-6">Our Services</h1>
//       <p className="text-lg text-gray-400 max-w-2xl mx-auto">
//         Here’s what we offer to help you stay secure and organized.
//       </p>

//       <div className="grid md:grid-cols-3 gap-6 mt-10">
//         <div className="bg-card border border-border rounded-xl p-6">
//           <h2 className="text-xl font-semibold mb-2">🔒 Password Storage</h2>
//           <p className="text-gray-400">Securely store all your passwords in one place.</p>
//         </div>

//         <div className="bg-card border border-border rounded-xl p-6">
//           <h2 className="text-xl font-semibold mb-2">💳 Card Management</h2>
//           <p className="text-gray-400">Save credit/debit card details safely.</p>
//         </div>

//         <div className="bg-card border border-border rounded-xl p-6">
//           <h2 className="text-xl font-semibold mb-2">🌙 Dark Mode</h2>
//           <p className="text-gray-400">Switch between light & dark themes with one click.</p>
//         </div>
//       </div>
//     </div>
//   )
// }
import Link from "next/link"

export default function ServicesPage() {
  return (
    <div className="p-10 text-center">
      <h1 className="text-4xl font-bold mb-6">Our Services</h1>
      <p className="text-lg text-gray-400 max-w-2xl mx-auto">
        Here’s what we offer to help you stay secure and organized.
      </p>

      <div className="grid md:grid-cols-3 gap-6 mt-10">
        
        {/* 🔒 Password Storage - clickable */}
        <Link href="/" className="bg-card border border-border rounded-xl p-6 hover:bg-accent transition-colors">
          <h2 className="text-xl font-semibold mb-2">🔒 Password Storage</h2>
          <p className="text-gray-400">Securely store all your passwords in one place.</p>
        </Link>

        {/* 💳 Card Management - clickable */}
        <Link href="/" className="bg-card border border-border rounded-xl p-6 hover:bg-accent transition-colors">
          <h2 className="text-xl font-semibold mb-2">💳 Card Management</h2>
          <p className="text-gray-400">Save credit/debit card details safely.</p>
        </Link>

        {/* 🌙 Dark Mode - optional redirect or info only */}
        <div className="bg-card border border-border rounded-xl p-6">
          <h2 className="text-xl font-semibold mb-2">🌙 Dark Mode</h2>
          <p className="text-gray-400">Switch between light & dark themes with one click.</p>
        </div>

      </div>
    </div>
  )
}
