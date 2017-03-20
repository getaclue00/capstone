class FixColumnNamesInCompanyPreferencesTable < ActiveRecord::Migration[5.0]
  def up
    rename_column :company_preferences, :workMonday, :work_monday
    rename_column :company_preferences, :mondayOpen, :monday_open
    rename_column :company_preferences, :mondayClose, :monday_close
    rename_column :company_preferences, :workTuesday, :work_tuesday
    rename_column :company_preferences, :tuesdayOpen, :tuesday_open
    rename_column :company_preferences, :tuesdayClose, :tuesday_close
    rename_column :company_preferences, :workWednesday, :work_wednesday
    rename_column :company_preferences, :wednesdayOpen, :wednesday_open
    rename_column :company_preferences, :wednesdayClose, :wednesday_close
    rename_column :company_preferences, :workThursday, :work_thursday
    rename_column :company_preferences, :thursdayOpen, :thursday_open
    rename_column :company_preferences, :thursdayClose, :thursday_close
    rename_column :company_preferences, :workFriday, :work_friday
    rename_column :company_preferences, :fridayOpen, :friday_open
    rename_column :company_preferences, :fridayClose, :friday_close
    rename_column :company_preferences, :workSaturday, :work_saturday
    rename_column :company_preferences, :saturdayOpen, :saturday_open
    rename_column :company_preferences, :saturdayClose, :saturday_close
    rename_column :company_preferences, :workSunday, :work_sunday
    rename_column :company_preferences, :sundayOpen, :sunday_open
    rename_column :company_preferences, :sundayClose, :sunday_close
  end
  def down
    rename_column :company_preferences, :work_monday, :workMonday
    rename_column :company_preferences, :monday_open, :mondayOpen
    rename_column :company_preferences, :monday_close, :mondayClose
    rename_column :company_preferences, :work_tuesday, :workTuesday
    rename_column :company_preferences, :tuesday_open, :tuesdayOpen
    rename_column :company_preferences, :tuesday_close, :tuesdayClose
    rename_column :company_preferences, :work_wednesday, :workWednesday
    rename_column :company_preferences, :wednesday_open, :wednesdayOpen
    rename_column :company_preferences, :wednesday_close, :wednesdayClose
    rename_column :company_preferences, :work_thursday, :workThursday
    rename_column :company_preferences, :thursday_open, :thursdayOpen
    rename_column :company_preferences, :thursday_close, :thursdayClose
    rename_column :company_preferences, :work_friday, :workFriday
    rename_column :company_preferences, :friday_open, :fridayOpen
    rename_column :company_preferences, :friday_close, :fridayClose
    rename_column :company_preferences, :work_saturday, :workSaturday
    rename_column :company_preferences, :saturday_open, :saturdayOpen
    rename_column :company_preferences, :saturday_close, :saturdayClose
    rename_column :company_preferences, :work_sunday, :workSunday
    rename_column :company_preferences, :sunday_open, :sundayOpen
    rename_column :company_preferences, :sunday_close, :sundayClose
  end
end
