package com.phonegap.helloworld;

import android.app.Activity;
import com.phonegap.*;
import android.os.Bundle;
/* Test comment 1 */
/* Test comment 2 */
public class App extends DroidGap {
    /** Called when the activity is first created. */
    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        super.loadUrl("file:///android_asset/www/index.html");
    }
}