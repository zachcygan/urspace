import { React, useEffect } from 'react';
import { Fragment } from 'react'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { MagnifyingGlassIcon } from '@heroicons/react/20/solid'
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline'
import {Searchbar,Notification} from '../components';
import { useQuery } from '@apollo/client';
import { GET_ME } from '../utils/queries';
import auth from '../utils/auth';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Navbar() {

  const {loading,data} = useQuery(GET_ME);
  const logout = (e)=>{
    e.preventDefault();
    auth.logout();
  }
  const login = (e)=>{
    e.preventDefault();
    window.location.href = '/login';
  }

  useEffect(()=>{
    if(data){
      console.log(data.me.username);
    }
  },[data])

  const handleProfileToLogin = (e)=>{
    e.preventDefault();
    window.location.href = '/profile';
  }

  const routeToProfile = async ()=>{
    window.location.href = `/profile/${data.me.username}`;
  }

  console.log(data);
  return (
    <Disclosure as="nav" className="bg-white shadow justify-between w-full">
      {({ open }) => (
        <>
          <div className="mx-auto px-2 sm:px-4 lg:px-8 ">
            <div className="flex h-16 justify-between">
              <div className="flex ">
                <div className="flex flex-shrink-0 items-center text-cyan-950 text-2xl  ">
                  <h2>U R S P A C E</h2>
                </div>
              </div>
              <div className="flex flex-1 items-center justify-center px-2 lg:ml-6 lg:justify-end">
              <Notification/>
                <div className="w-full max-w-lg lg:max-w-xs">
                

                  <label htmlFor="search" className="sr-only">
                    Search
                  </label>
                  {/* <div className="relative">
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                      <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                    </div>
                    <input
                      id="search"
                      name="search"
                      className="block w-full rounded-md border-0 bg-white py-1.5 pl-10 pr-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      placeholder="Search"
                      type="search"
                    />
                  </div> */}
                 
                  <Searchbar/>
                </div>
              </div>
              <div className="flex items-center lg:hidden">
                {/* Mobile menu button */}
                <Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
              
            </div>
          </div>

          <Disclosure.Panel className="lg:hidden">
            <div className="border-t border-gray-200 pb-3 pt-4">
              <div className="flex items-center px-4">           
              </div>
              <div className="mt-3 space-y-1">
                <Disclosure.Button
                  as="a"
                  href="/"
                  className="block px-4 py-2 text-base font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-800"
                >
                  Home
                </Disclosure.Button>
                <Disclosure.Button
                  as="a"
                  href="/posts"
                  className="block px-4 py-2 text-base font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-800"
                >
                  Posts
                </Disclosure.Button>
                <Disclosure.Button
                  as="a"
                  onClick={auth.loggedIn() ? handleProfileToLogin : routeToProfile }
                  className="block px-4 py-2 text-base font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-800"
                >
                  Profile
                </Disclosure.Button>
                <Disclosure.Button
                  as="a"
                  onClick={auth.loggedIn() ? logout : login }
                  href="#"
                  className="block px-4 py-2 text-base font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-800"
                >
                  {auth.loggedIn() ? 'Logout' : 'Login'}
                </Disclosure.Button>
              </div>
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  )
}