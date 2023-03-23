import Link from 'next/link';
import { useRouter } from 'next/router';
import hospitalIcon from '../public/hospital.png'


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
      <header className='bg-purple-200 sticky top-0 flex h-8 justify-center items-center font-semibold uppercase'>
      <img src={hospitalIcon} />
      </header>
      <div className='flex flex-col md:flex-row flex-1'>
        <aside className='bg-gray-200 w-full md:w-60'>
          <nav>
            <ul>
              {menuItems.map(({ href, title }) => (
                <li className='m-2' key={title}>
                  <Link href={href} passHref>
                <div className={`flex p-2 bg-white hover:bg-gray-400 cursor-pointer rounded-xl ${
                        router.asPath === href && 'bg-indigo-200'
                      }`}>
                    <span className="font-semibold text-blue-600">{title}</span>
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