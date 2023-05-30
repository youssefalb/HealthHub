import { getAllVisitsIds, getVisitDetails } from "@/lib/visits";
import { Role } from "@prisma/client";
import { useSession } from "next-auth/react";

export default function Visit(visitData) {
  return (
    <h1>Hello {visitData.visitId}</h1>
  );
}

export async function getStaticPaths() {
  // Return a list of possible value for id
  //
  const paths = await getAllVisitsIds();

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  // Fetch necessary data for the blog post using params.id
  const res = await getVisitDetails(Role.PATIENT, params.id)
  const visitData = await res.json()

  console.log(visitData)
  return {
    props: {
      visitData,
    }
  }
}

