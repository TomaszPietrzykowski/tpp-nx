import React from 'react';
import styles from '../home.module.scss';

const ContactPage = () => {
  return (
    <div className={styles.page}>
      <div className="wrapper">
        <div className="container" style={{ paddingTop: '4rem' }}>
          <div id="welcome">
            <h1>
              Transkulturowa <br /> Psychoterapia <br /> Pozytywna
            </h1>
          </div>

          <div id="hero" className="rounded">
            <div className="text-container">
              <h2>
                <span>Contact | w budowie</span>
              </h2>
              <div className="links" style={{ display: 'flex', gap: '1rem' }}>
                <div>
                  <a href="/">Home</a>
                </div>
              </div>
            </div>
          </div>
          <div id="commands" className="rounded shadow">
            <h2>Next steps</h2>
            <p>Here are some things you can do with Nx:</p>
            <details>
              <summary>
                <svg
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
                Add UI library
              </summary>
              <pre>
                <span># Generate UI lib</span>
                nx g @nx/next:library ui
                <span># Add a component</span>
                nx g @nx/next:component button --project=ui
              </pre>
            </details>
            <details>
              <summary>
                <svg
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
                View interactive project graph
              </summary>
              <pre>nx graph</pre>
            </details>
            <details>
              <summary>
                <svg
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
                Run affected commands
              </summary>
              <pre>
                <span># see what&apos;s been affected by changes</span>
                nx affected:graph
                <span># run tests for current changes</span>
                nx affected:test
                <span># run e2e tests for current changes</span>
                nx affected:e2e
              </pre>
            </details>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
