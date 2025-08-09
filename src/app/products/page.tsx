import { Metadata } from "next"

export const metadata: Metadata = {
    title: 'Produtos'
}
export default function ProductsPage() {
    return (
        <div className="w-full max-w-7xl mx-auto px-10 lg:px-0">
        <h1 className="text-3xl font-extrabold tracking-tight lg:text-5xl">Meus produtos</h1>
        
        </div>
    )
}