This technote refers to a "no module found problem" that might happen as developers are trying to move from Python25 to Python27 with GAE plus webapp2 — and notes on how to solve the problem with App Engine. 

# Contributors

If you want to contribute to this article you can submit a patch to the Github.com/taboca/telasocial-labs repo. 

## Case 

With GAE SDK it is now possible to move to Python27 and use webapp2 libraries. Google has released a [migration documentation](https://developers.google.com/appengine/docs/python/python25/migrate27#appyaml) which explains how to setup the "myapp.app" file and have it properly configured with webapp2 so it works with GAE. However, the documentation fails to point a problem you may find with Mac OS X (case I was able to find.)

## From GAE documentation

It was said that you need to create a file named "myapp.app" and refer to this file from the app.yaml: 

    handlers:
    - url: /.*
      script: myapp.app


## Instead, fix in Mac OS X is to not create a myapp.app file

The configuration looks the same: 

    handlers: 
    - url: /.*
      script: myapp.app

However you will need to create a .py file

## myapp.py file

And this file will need to set a "app" object as shown in the following example: 
    import webapp2

    class MainPage(webapp2.RequestHandler):
      def get(self):
        self.response.headers['Content-Type'] = 'text/plain'
        self.response.out.write('Hello, WebApp World!')

        app = webapp2.WSGIApplication([('/', MainPage)])

