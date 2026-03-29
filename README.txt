1.  getElementById is used to select a single element by its unique ID. It returns only one element.
    getElementsByClassName is used to select all elements with a given class name. It returns a live HTMLCollection.
    querySelector selects the first element that matches a CSS selector. It is more flexible because it can use class, id, or tag selectors.
    querySelectorAll selects all elements that match a CSS selector. It returns a static Node list.

2. To create and insert a new element into the DOM, we use JavaScript methods step by step.
   First, we create the element using document.createElement().
   Then, we add content or text to the element.
   Finally, we insert it into the webpage using methods like appendChild().

   Example:
   let p = document.createElement("p");   
   p.innerText = "Hello World";           
   document.body.appendChild(p);          

3. Event Bubbling is a process where an event starts from the target element and moves to its parents in the DOM.
  When an event occurs on an element, it first runs on that element, then it bubbles up to its parent, then to its parent, and so on.

4. Event Delegation is a method where we add an event listener to the parent element instead of adding   event listener for each childs.
It is useful because:
a) It reduces the number of event listeners, so it improves performance.
b) It can handle dynamically added elements.
c) It keeps the code simple and easy to maintain.

5. preventDefault() is used to stop the default behavior of an element. For example, stopping a link from opening or a form from submitting. 
And,
stopPropagation() is used to stop the event from bubbling up to parent elements
