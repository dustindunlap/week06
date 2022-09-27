import { getResourceData, getResourceIds } from "../../lib/resources";


export async function getStaticProps({ params }) {
    const itemData = await getResourceData(params.id);
    return {
        props: {
            itemData
        }
    };
}

export async function getStaticPaths() {
    const paths = await getResourceIds();
    return {
        paths,
        fallback: false
    };
}

export default function Entry({ itemData }) {
    return (
      <article className="card col-6 text-dark">
        <div className="card-body">
          <h5 className="card-title">{itemData.data.name}</h5>
          <h6 className="card-subtitle mb-2 text-muted">{itemData.data.phone}</h6>
          <p className="card-text">{itemData.data.birthdate}</p>
          <a href={'mailto:' + itemData.data.email} className="card-link">{itemData.data.email}</a>
        </div>
      </article>
    );
  }