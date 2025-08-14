type CategoryPageProps = {
	params: {
		categorySlug: string;
	};
};

export default async function CategoryPage ({params}:CategoryPageProps) {
    const {categorySlug} =  params


    return (
        <div>
            
        </div>
    )
}