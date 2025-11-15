@echo off
echo ========================================
echo     KHUF DE GRATE - E-COMMERCE SITE
echo ========================================
echo.

REM Check if node_modules exists
if not exist "node_modules\" (
    echo Installing dependencies...
    echo This may take a few minutes...
    echo.
    call npm install
    echo.
    echo Dependencies installed successfully!
    echo.
)

echo Starting khuf de grate shop...
echo The site will open automatically in your browser.
echo Press Ctrl+C to stop the server.
echo.
echo ========================================
echo.

call npm run dev

echo.
echo Dev server ended. Press any key to close this window...
pause
