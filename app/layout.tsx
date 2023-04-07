//fix this SHIT

import Link from 'next/link';
import { useRouter } from 'next/navigation';

// Just a black line to style header nicely
const ColoredLine = ({ color }) => (
  <hr
      style={{
          color: color,
          backgroundColor: color,
          height: 1
      }}
  />
);

export default function Layout({ children }) {
  const router = useRouter();

  const menuItems = [
    {
      href: '/',
      title: 'Home',
    },
    {
      href: '/about',
      title: 'About',
    },
    {
      href: '/contact',
      title: 'Contact',
    },
  ];

  return (
    <div className='min-h-screen flex flex-col'>
      <header className='bg-white top-0 flex justify-between items-center font-semibold'>
        <div className='ml-8 w-52'>
          <img src="./images/logotype.png" alt=""></img>
        </div>
        
        <div className='mr-10 items-center'>
          <Link href='/auth/login' passHref>
            <button className='px-8 py-1 text-white bg-blue-400 rounded-2xl mr-2 my-3'>Login</button>
          </Link>
          <Link href='/auth/register' passHref>
            <button className='px-8 py-1 text-blue-400 bg-white border border-blue-400 rounded-2xl mr-2 my-3'>Register</button>
          </Link>
        </div>
  </header>
  <ColoredLine color="black" />
      <div className='flex flex-col md:flex-row flex-1'>
        <aside className='bg-gray-100 w-full md:w-60'>
          <nav>
            <ul>
              {menuItems.map(({ href, title }) => (
                <li className='m-2' key={title}>
                  <Link href={href} passHref>
                <div className="flex p-2 bg-gray-50 hover:bg-gray-200 cursor-pointer rounded-lg bg-gray-200 text-blue-400">
                    <span className="font-semibold text-gray-600 mx-6 text-sm">{title}</span>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </aside>
        <main className='flex-1'>{children}</main>
      </div>
    </div>
  );
}
