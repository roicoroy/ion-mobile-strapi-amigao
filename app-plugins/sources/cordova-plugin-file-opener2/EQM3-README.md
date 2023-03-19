# A File Opener Plugin for Cordova, this plugin is a direct clone from github https://github.com/pwlin/cordova-plugin-file-opener2

## Changes
   Owner of the project stopped maintaining the plugin for awhile, Google is now requiring additional verification for the REQUEST_INSTALL_PACKAGES permission, and will start rejecting apps that have not submitted a valid use.
   So we decided to remove REQUEST_INSTALL_PACKAGES permission from plugin.xml (Line 25,  remove <uses-permission android:name="android.permission.REQUEST_INSTALL_PACKAGES" />).
      <config-file target="AndroidManifest.xml" parent="/*">
            <uses-permission android:name="android.permission.READ_EXTERNAL_STORAGE" />
            <uses-permission android:name="android.permission.REQUEST_INSTALL_PACKAGES" />
        </config-file>
    (Solution can be find in github https://github.com/pwlin/cordova-plugin-file-opener2/issues/329). More information can be find in our Jira ticket EPD-71433 
   


   Due to the Android updates, now we use androidx.core.content.FileProvider as File Provider based class inside FileProvider.java.  More info can be find at (https://stackoverflow.com/questions/40746144/error-with-duplicated-fileprovider-in-manifest-xml-with-cordova/41550634#41550634)
   
