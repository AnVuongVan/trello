<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>{{ config('app.name', 'Login') }}</title>
    <link href="{{ asset('auth/style.css') }}" rel="stylesheet">
    <script src="https://kit.fontawesome.com/64d58efce2.js" crossorigin="anonymous"></script>
</head>
<body>
    <div class="container sign-up-mode">
        <div class="forms-container">
            <div class="signin-signup">
            <form method="POST" action="{{ route('register') }}" class="sign-up-form">
                {{ csrf_field() }}
                <h2 class="title">Sign up</h2>

                <div class="input-field form-group{{ $errors->has('name') ? ' has-error' : '' }}">
                    <i class="fas fa-user"></i>
                    <input id="name" type="text" placeholder="Username" name="name" value="{{ old('name') }}" required autofocus/>
                    @if ($errors->has('name'))
                        <span class="help-block">
                            <strong>{{ $errors->first('name') }}</strong>
                        </span>
                    @endif
                </div>

                <div class="input-field form-group{{ $errors->has('email') ? ' has-error' : '' }}">
                    <i class="fas fa-envelope"></i>
                    <input id="email" type="email" placeholder="Email" name="email" value="{{ old('email') }}" required/>
                    @if ($errors->has('email'))
                        <span class="help-block">
                            <strong>{{ $errors->first('email') }}</strong>
                        </span>
                    @endif
                </div>

                <div class="input-field form-group{{ $errors->has('password') ? ' has-error' : '' }}">
                    <i class="fas fa-lock"></i>
                    <input id="password" type="password" placeholder="Password" name="password" required/>
                    @if ($errors->has('password'))
                        <span class="help-block">
                            <strong>{{ $errors->first('password') }}</strong>
                        </span>
                    @endif
                </div>

                <div class="input-field">
                    <i class="fas fa-lock"></i>
                    <input id="password-confirm" type="password" placeholder="Confirm password" name="password_confirmation" required />
                </div>

                <input type="submit" class="btn" value="Sign up" />

                <p class="social-text">Or Sign up with social platforms</p>
                <div class="social-media">
                <a href="#" class="social-icon">
                    <i class="fab fa-facebook-f"></i>
                </a>
                <a href="#" class="social-icon">
                    <i class="fab fa-twitter"></i>
                </a>
                <a href="#" class="social-icon">
                    <i class="fab fa-google"></i>
                </a>
                <a href="#" class="social-icon">
                    <i class="fab fa-linkedin-in"></i>
                </a>
                </div>
            </form>
            </div>
        </div>

        <div class="panels-container">
            <div class="panel left-panel"></div>
            <div class="panel right-panel">
                <div class="content">
                <h3>One of us ?</h3>
                <p>
                Life is like riding a bicycle. To keep your balance, you must keep moving.
                </p>
                <button class="btn transparent" id="sign-in-btn">
                    Sign in
                </button>
                </div>
                <img src="auth/img/register.svg" class="image" alt="" />
            </div>
        </div>
    </div>
    
    <script type="text/javascript">
        const sign_in_btn = document.querySelector("#sign-in-btn");
        sign_in_btn.addEventListener("click", () => {
            window.location.href = 'http://127.0.0.1:8000/login';
        });
    </script>
  </body>
</html>