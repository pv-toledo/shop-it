type CategoryPageProps = {
	params: {
		categorySlug: string;
	};
};

export default async function CategoryPage ({params}:CategoryPageProps) {
    const {categorySlug} =  params
    console.log(categorySlug)

    return (
        <h1>{categorySlug}</h1>
    )
}