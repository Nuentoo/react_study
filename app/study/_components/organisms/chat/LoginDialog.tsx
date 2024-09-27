'use client';

import { useState, useRef } from 'react';
import { login, signUp } from './modules/actions';

export default function LoginDialog() {
  const [error, setError] = useState<string | null>(null);
  const dialogRef = useRef<HTMLDialogElement | null>(null);

  const handleLogin = (formData: FormData) => {
    login(formData).catch((e: Error) => {
      setError(e.message);
    });
  };

  const handleSignUp = (formData: FormData) => {
    signUp(formData).catch((e: Error) => {
      setError(e.message);
    });
  };

  const showModal = () => {
    dialogRef.current?.showModal();
  };

  const hideModal = () => {
    dialogRef.current?.close();
  };

  return (
    <>
      <dialog
        ref={dialogRef}
        className="w-[300px] rounded-lg bg-gray-700 shadow"
      >
        <div className="">
          <fieldset className="">
            <div className="flex items-center justify-between rounded-t border-b border-gray-600 p-4 md:p-5">
              <legend
                id="loginForm"
                className="text-xl font-semibold text-white"
              >
                Sign in to Chat
              </legend>
              <button
                type="button"
                className="end-2.5 ms-auto inline-flex size-8 items-center justify-center rounded-lg bg-transparent text-sm hover:bg-gray-600 hover:text-white"
                onClick={hideModal}
              >
                <svg
                  className="size-3"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 14"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                  />
                </svg>
                <span className="sr-only">Close modal</span>
              </button>
            </div>
            <div className="p-4 md:p-5">
              <form className="space-y-4">
                <div>
                  <label
                    htmlFor="nickname"
                    className="mb-2 block text-sm font-medium text-white"
                  >
                    Nickname
                  </label>
                  <input
                    type="text"
                    id="nickname"
                    name="nickname"
                    required
                    autoComplete="nickname"
                    className="block w-full rounded-lg border-gray-500 bg-gray-600 px-2.5 py-1.5 text-sm text-white placeholder:text-gray-400 focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label
                    htmlFor="password"
                    className="mb-2 block text-sm font-medium text-white"
                  >
                    Password
                  </label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    required
                    autoComplete="current-password"
                    className="block w-full rounded-lg border-gray-500 bg-gray-600 px-2.5 py-1.5 text-sm text-white placeholder:text-gray-400 focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
                <div className="flex justify-between">
                  <div className="flex items-start">
                    <div className="flex h-5 items-center">
                      <input
                        id="remember"
                        type="checkbox"
                        value=""
                        className="size-4 rounded border-gray-500 bg-gray-600 ring-offset-gray-800 focus:ring-blue-600 focus:ring-offset-gray-800"
                      />
                    </div>
                    <label
                      htmlFor="remember"
                      className="ms-2 text-sm font-medium text-gray-300"
                    >
                      Remember me
                    </label>
                  </div>
                  <a className="text-sm text-blue-500 hover:underline">
                    Lost Password?
                  </a>
                </div>
                <div className="flex gap-x-4">
                  <button
                    type="submit"
                    formAction={handleLogin}
                    className="w-full rounded-lg bg-blue-600 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-800"
                  >
                    Login
                  </button>
                  <button
                    type="submit"
                    formAction={handleSignUp}
                    className="w-full rounded-lg bg-blue-600 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-800"
                  >
                    Sign up
                  </button>
                </div>
                <p>
                  <strong className="mt-4 text-red-500">{error}</strong>
                </p>
              </form>
            </div>
          </fieldset>
        </div>
      </dialog>

      <button
        className="mx-auto block rounded-lg bg-blue-600 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-800"
        type="button"
        onClick={showModal}
      >
        Login Form
      </button>
    </>
  );
}
