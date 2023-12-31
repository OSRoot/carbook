import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FunctionsService } from 'src/app/services/functions/functions.service';
// import { User } from 'src/app/interfaces/interfaces';
import { DataService } from 'src/app/services/data/data.service';
import { Storage } from '@ionic/storage-angular';
import { AuthService } from 'src/app/services/auth/auth.service';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {
  workType: string[] = ['معارض', 'بائع شخصي'];
  clickedIndex = 0;
  selectedWork!: string;
  userForm!: FormGroup;
  fullname: string = '';
  phone: string = '';
  password: string = '';
  confirmPassword!: string;
  passwordsMatch: boolean = true;
  // #################### START ############################
  user: any={};
  constructor(
    private funcService: FunctionsService,
    private dataService:DataService,
    private storage: Storage,
    private authService: AuthService
  ) {
    this.selectedWork = 'بائع شخصي';
    this.userForm = new FormGroup({
      fullname: new FormControl('', Validators.required),
      phone: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
      confirmPass: new FormControl('', Validators.required),
    });
  }
  ngOnInit() {
  }
  // #######################################################
  async ionViewWillEnter() {
    this.user = await this.dataService.getUser();
    if (this.user?._id) this.funcService.navigate('/tabs/home', 'back');
  }
  // ########## handle the password visibilty ###############
  showPassword = false;
  toggleShowPassword() {
    this.showPassword = !this.showPassword;
  }
  // ################# END ##################################
  signUp(){
    if (this.userForm.invalid) return;
    if (this.password !== this.confirmPassword) {
          this.funcService.presentToast('كلمة المرور غير متطابقة');
          return;
        }
    this.authService.signup(this.userForm.value);
  }
  // #######################################################
  navigate(page: string, dir: string, path?: string) {
    this.funcService.navigate(page, dir, path);
  }
  // #######################################################
  login() {
    this.funcService.navigate('/login', 'back');
  }
  // #######################################################

}