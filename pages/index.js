import Head from 'next/head'
import Link from 'next/link';
import styles from '../styles/Home.module.css'
import { getSortedList } from '../lib/data';



export async function getStaticProps() {
  const allData = getSortedList();
  return {
    props: {
      allData
    }
  }
}
export default function Home({ allData }) {
  return (
    <>
        <h1>List of Names</h1>
        <div className="list-group">
          {allData ? 
            allData.map(({ id, name }) => (
              <Link key={id} href={`/${id}`}>
                <a className="list-group-item list-group-item-action">{name}</a>
              </Link>
          ))
        : null}
        </div>
    </>
  );
}
