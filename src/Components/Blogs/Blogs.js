import React from 'react';

const Blogs = () => {
    return (
        <div className='bg-neutral'>
            <div className='container pt-5  px-10'>

                <div className="card bg-base-100 shadow-xl ">
                    <div className="card-body">
                        <h1>1. What are the different ways to manage a state in a React application?</h1>
                        <br />
                        <h3>Ans:URL state is often missing as a category of state, but it is an important one.
                        In many cases, a lot of major parts of our application rely upon accessing URL state. Try to imagine building a blog without being able to fetch a post based off of its slug or id that is located in the URL!
                        <br />
                        <br />
                        The Four Kinds of React State to Manage Local state. Global state. Server state. URL state.
                        </h3>

                    </div>
                </div>
                <div className="card bg-base-100 shadow-xl mt-5">
                    <div className="card-body">
                        <h1>2.How does prototypical inheritance work?</h1>
                        <br />
                        <h3>Ans:The Prototypal Inheritance is a feature in javascript used to add methods and properties in objects. It is a method by which an object can inherit the properties and methods of another object. Traditionally, in order to get and set the [[Prototype]] of an object, we use Object. getPrototypeOf and Object.</h3>

                    </div>
                </div>
                <div className="card bg-base-100 shadow-xl mt-5">
                    <div className="card-body">
                        <h1>3.What is a unit test? Why should we write unit tests?</h1>
                        <br />
                        <h3>Ans:The main objective of unit testing is to isolate written code to test and determine if it works as intended. Unit testing is an important step in the development process, because if done correctly, it can help detect early flaws in code which may be more difficult to find in later testing stages.</h3>

                    </div>
                </div>
                <div className="card bg-base-100 shadow-xl mt-5 ">
                    <div className="card-body">
                        <h1>4.React vs. Angular vs. Vue?</h1>
                        <br />
                        <h3>Ans:Vue provides higher customizability and hence is easier to learn than Angular or React. Further, Vue has an overlap with Angular and React with respect to their functionality like the use of components. Hence, the transition to Vue from either of the two is an easy option.</h3>

                    </div>
                </div>

                
            </div>
        </div>
    );
};

export default Blogs;