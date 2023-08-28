import { Component, OnInit } from '@angular/core';
import { FunctionsService } from 'src/app/services/functions/functions.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Storage } from '@ionic/storage-angular';
import { AuthService } from 'src/app/services/auth/auth.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  userPhone!: string;
  userPassword!: string;
  loginForm!: FormGroup;
  user: any;
  constructor(
    private funcService: FunctionsService,
    private storage: Storage,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.loginForm = new FormGroup({
      phone: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
    });
  }
  async ionViewWillEnter() {
    this.user = await this.storage.get('user');
    if (this.user?._id) this.funcService.navigate('/tabs/home', 'back');
  }

  // ########## handle the password visibilty ###############
  password: any;
  showPassword = false;
  toggleShowPassword() {
    this.showPassword = !this.showPassword;
  }
  // ################# END ##################################
  // #######################################################

  // #######################################################
  navigate(page: string, dir: string, path?: string) {
    this.funcService.navigate(page, dir, path);
  }
  // #######################################################

  login(): any {
    if (this.loginForm.invalid) return false;
    this.authService.login(this.loginForm.value);
  }
  // #######################################################
  register() {
    this.funcService.navigate('/signup', 'forward');
  }
  // #######################################################
}
