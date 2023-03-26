import React from "react";
import type { GetServerSideProps } from "next";
import Layout from "../../components/Layout";
import Post, { PostProps } from "../../components/Post";
import prisma from '../../lib/prisma'


function index() {
  return <h1>Index</h1>;
}

export default index;